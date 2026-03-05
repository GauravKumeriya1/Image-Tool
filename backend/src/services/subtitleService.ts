/**
 * Subtitle format generators
 * Converts transcription to SRT, VTT, and STL formats
 */

interface Segment {
  id?: number
  start: number
  end: number
  text: string
}

/**
 * Convert seconds to SRT time format: HH:MM:SS,mmm
 */
const secondsToSRTTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.floor((seconds % 1) * 1000)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(millis).padStart(3, '0')}`
}

/**
 * Convert seconds to VTT time format: HH:MM:SS.mmm
 */
const secondsToVTTTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.floor((seconds % 1) * 1000)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

/**
 * Convert seconds to STL time format (frames, assuming 25 fps)
 */
const secondsToSTLTime = (seconds: number, fps: number = 25): number => {
  return Math.floor(seconds * fps)
}

/**
 * Parse transcript and create segments with proper timing
 */
const parseTranscriptToSegments = (
  transcript: string,
  segments?: any[]
): Segment[] => {
  // If we have detailed segments from Whisper, use them
  if (segments && segments.length > 0) {
    return segments.map((seg: any, index: number) => ({
      id: index + 1,
      start: seg.start,
      end: seg.end,
      text: seg.text.trim(),
    }))
  }

  // Otherwise, create segments from the full transcript
  // Split by sentences or chunks
  const sentences = transcript.match(/[^.!?]+[.!?]+/g) || [transcript]
  const segmentList: Segment[] = []
  const wordsPerSecond = 2.5 // Average speaking speed
  let currentTime = 0

  sentences.forEach((sentence, index) => {
    const text = sentence.trim()
    const wordCount = text.split(/\s+/).length
    const duration = wordCount / wordsPerSecond

    segmentList.push({
      id: index + 1,
      start: currentTime,
      end: currentTime + duration,
      text,
    })

    currentTime += duration
  })

  return segmentList
}

/**
 * Generate SRT (SubRip) format subtitle
 * Format:
 * 1
 * 00:00:01,000 --> 00:00:05,000
 * Subtitle text
 */
export const generateSRT = (
  transcript: string,
  segments?: any[]
): string => {
  const parsedSegments = parseTranscriptToSegments(transcript, segments)

  const srtContent = parsedSegments
    .filter((seg) => seg.text.trim().length > 0)
    .map((seg) => {
      const startTime = secondsToSRTTime(seg.start)
      const endTime = secondsToSRTTime(seg.end)
      return `${seg.id}\n${startTime} --> ${endTime}\n${seg.text.trim()}\n`
    })
    .join('\n')

  return srtContent
}

/**
 * Generate VTT (WebVTT) format subtitle
 * Format:
 * WEBVTT
 *
 * 00:00:01.000 --> 00:00:05.000
 * Subtitle text
 */
export const generateVTT = (
  transcript: string,
  segments?: any[]
): string => {
  const parsedSegments = parseTranscriptToSegments(transcript, segments)

  const vttContent =
    'WEBVTT\n\n' +
    parsedSegments
      .filter((seg) => seg.text.trim().length > 0)
      .map((seg) => {
        const startTime = secondsToVTTTime(seg.start)
        const endTime = secondsToVTTTime(seg.end)
        return `${startTime} --> ${endTime}\n${seg.text.trim()}\n`
      })
      .join('\n')

  return vttContent
}

/**
 * Generate STL (EBU-STL) format subtitle
 * This is a simplified text-based representation
 * Real STL is binary, but we'll provide GSB (General Subtitle Format)
 */
export const generateSTL = (
  transcript: string,
  segments?: any[],
  fps: number = 25
): Buffer => {
  const parsedSegments = parseTranscriptToSegments(transcript, segments)

  // Create a simplified STL-like format
  let stlContent = ''

  parsedSegments.forEach((seg) => {
    if (seg.text.trim().length > 0) {
      const startFrame = secondsToSTLTime(seg.start, fps)
      const endFrame = secondsToSTLTime(seg.end, fps)
      stlContent += `${String(startFrame).padStart(8, '0')} ${String(endFrame).padStart(8, '0')} ${seg.text.trim()}\n`
    }
  })

  return Buffer.from(stlContent, 'utf-8')
}

/**
 * Generate JSON format with detailed timing information
 */
export const generateJSON = (
  transcript: string,
  segments?: any[]
): string => {
  const parsedSegments = parseTranscriptToSegments(transcript, segments)

  const jsonData = {
    transcript,
    segments: parsedSegments.filter((seg) => seg.text.trim().length > 0),
    generatedAt: new Date().toISOString(),
  }

  return JSON.stringify(jsonData, null, 2)
}

/**
 * Convert between subtitle formats
 */
export const convertSubtitleFormat = (
  content: string,
  fromFormat: 'srt' | 'vtt' | 'json',
  toFormat: 'srt' | 'vtt' | 'stl' | 'json'
): string | Buffer => {
  // Parse the original format first
  let segments: Segment[] = []

  if (fromFormat === 'srt') {
    segments = parseSRT(content)
  } else if (fromFormat === 'vtt') {
    segments = parseVTT(content)
  } else if (fromFormat === 'json') {
    const parsed = JSON.parse(content)
    segments = parsed.segments || []
  }

  // Generate the target format
  const transcript = segments.map((s) => s.text).join(' ')

  if (toFormat === 'srt') {
    return generateSRT(transcript, segments)
  } else if (toFormat === 'vtt') {
    return generateVTT(transcript, segments)
  } else if (toFormat === 'stl') {
    return generateSTL(transcript, segments)
  } else if (toFormat === 'json') {
    return generateJSON(transcript, segments)
  }

  return ''
}

/**
 * Parse SRT format subtitle
 */
const parseSRT = (content: string): Segment[] => {
  const segments: Segment[] = []
  const regex =
    /(\d+)\n(\d{2}):(\d{2}):(\d{2}),(\d{3})\s+-->\s+(\d{2}):(\d{2}):(\d{2}),(\d{3})\n([\s\S]*?)(?=\n\n|\n$)/g

  let match
  let index = 1

  while ((match = regex.exec(content)) !== null) {
    const startHours = parseInt(match[2])
    const startMinutes = parseInt(match[3])
    const startSeconds = parseInt(match[4])
    const startMillis = parseInt(match[5])
    const start =
      startHours * 3600 + startMinutes * 60 + startSeconds + startMillis / 1000

    const endHours = parseInt(match[6])
    const endMinutes = parseInt(match[7])
    const endSeconds = parseInt(match[8])
    const endMillis = parseInt(match[9])
    const end =
      endHours * 3600 + endMinutes * 60 + endSeconds + endMillis / 1000

    const text = match[10].trim()

    segments.push({
      id: index++,
      start,
      end,
      text,
    })
  }

  return segments
}

/**
 * Parse VTT format subtitle
 */
const parseVTT = (content: string): Segment[] => {
  const segments: Segment[] = []
  const lines = content.split('\n').slice(1) // Skip WEBVTT header

  let i = 0
  let index = 1

  while (i < lines.length) {
    const timeLine = lines[i].trim()

    // Look for time line
    if (timeLine.includes('-->')) {
      const times = timeLine.split('-->')
      const startStr = times[0].trim()
      const endStr = times[1].trim()

      // Parse VTT time format
      const [startHours, startMinutes, startSeconds] = startStr
        .split(':')
        .map((x) => parseFloat(x))
      const start = startHours * 3600 + startMinutes * 60 + startSeconds

      const [endHours, endMinutes, endSeconds] = endStr.split(':').map((x) => parseFloat(x))
      const end = endHours * 3600 + endMinutes * 60 + endSeconds

      // Get text lines until next empty line
      const textLines: string[] = []
      i++
      while (i < lines.length && lines[i].trim() !== '') {
        textLines.push(lines[i].trim())
        i++
      }

      if (textLines.length > 0) {
        segments.push({
          id: index++,
          start,
          end,
          text: textLines.join('\n'),
        })
      }
    }
    i++
  }

  return segments
}
