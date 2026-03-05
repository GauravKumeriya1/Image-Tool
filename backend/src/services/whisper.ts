import axios from 'axios'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface TranscriptionResult {
  text: string
  duration: number
}

export const transcribeAudio = async (fileUrl: string): Promise<TranscriptionResult> => {
  try {
    // This is a placeholder. Implement actual Whisper API call
    // You'll need to download the file and send it to OpenAI's API
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        file: fileUrl,
        model: 'whisper-1',
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return {
      text: response.data.text,
      duration: response.data.duration || 0,
    }
  } catch (error) {
    console.error('Transcription error:', error)
    throw new Error('Failed to transcribe audio')
  }
}
