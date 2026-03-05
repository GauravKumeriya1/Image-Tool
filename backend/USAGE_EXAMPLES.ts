import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

// Example: Upload and transcribe audio
async function uploadAndTranscribe(filePath: string, projectName: string) {
  try {
    // Step 1: Upload file
    console.log('Uploading file...')
    const formData = new FormData()
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    const file = fileInput.files?.[0]

    if (!file) {
      console.error('No file selected')
      return
    }

    formData.append('file', file)
    formData.append('projectName', projectName)
    formData.append('language', 'en')

    const uploadResponse = await axios.post(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    const uploadId = uploadResponse.data.data.id
    console.log('File uploaded:', uploadId)

    // Step 2: Start transcription
    console.log('Starting transcription...')
    const transcribeResponse = await axios.post(
      `${API_URL}/transcribe`,
      { uploadId }
    )

    const transcriptId = transcribeResponse.data.data.transcriptId
    console.log('Transcription completed:', transcriptId)

    // Step 3: Get transcript
    const transcriptResponse = await axios.get(
      `${API_URL}/transcript/${transcriptId}`
    )

    console.log('Transcript:', transcriptResponse.data.data.fullText)

    return {
      uploadId,
      transcriptId,
      transcript: transcriptResponse.data.data,
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Example: Download subtitle in specific format
async function downloadSubtitle(
  transcriptId: string,
  format: 'srt' | 'vtt' | 'stl'
) {
  try {
    const response = await axios.get(
      `${API_URL}/download/${format}/${transcriptId}`,
      {
        responseType: 'blob',
      }
    )

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `subtitles.${format}`)
    document.body.appendChild(link)
    link.click()
    link.parentElement?.removeChild(link)

    console.log(`Downloaded ${format} subtitles`)
  } catch (error) {
    console.error('Download error:', error)
    throw error
  }
}

// Example: Process uploaded file
async function processFile(file: File, projectName: string) {
  try {
    // Create form data
    const formData = new FormData()
    formData.append('file', file)
    formData.append('projectName', projectName)

    // Upload
    const uploadRes = await axios.post(`${API_URL}/upload`, formData)
    const uploadId = uploadRes.data.data.id

    // Transcribe
    const transcribeRes = await axios.post(
      `${API_URL}/transcribe`,
      { uploadId }
    )
    const transcriptId = transcribeRes.data.data.transcriptId

    // Get details
    const detailsRes = await axios.get(`${API_URL}/transcript/${transcriptId}`)

    return {
      uploadId,
      transcriptId,
      fullText: detailsRes.data.data.fullText,
      duration: detailsRes.data.data.duration,
      language: detailsRes.data.data.language,
    }
  } catch (error) {
    console.error('Processing error:', error)
    throw error
  }
}

// Example: Get all subtitle formats
async function getAllSubtitles(transcriptId: string) {
  try {
    const [srt, vtt, stl] = await Promise.all([
      axios.get(`${API_URL}/download/srt/${transcriptId}`, {
        responseType: 'blob',
      }),
      axios.get(`${API_URL}/download/vtt/${transcriptId}`, {
        responseType: 'blob',
      }),
      axios.get(`${API_URL}/download/stl/${transcriptId}`, {
        responseType: 'blob',
      }),
    ])

    return {
      srt: new Blob([srt.data], { type: 'text/plain' }),
      vtt: new Blob([vtt.data], { type: 'text/vtt' }),
      stl: new Blob([stl.data], { type: 'application/octet-stream' }),
    }
  } catch (error) {
    console.error('Error getting subtitles:', error)
    throw error
  }
}

export {
  uploadAndTranscribe,
  downloadSubtitle,
  processFile,
  getAllSubtitles,
}
