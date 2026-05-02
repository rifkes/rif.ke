import { useClient } from 'sanity'
import { useState } from 'react'

const SanityImageUpload = ({ value, onChange }) => {
  const client = useClient({ apiVersion: '2023-01-01' })
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setPreview(URL.createObjectURL(file))
    try {
      const asset = await client.assets.upload('image', file)
      onChange({ _type: 'image', asset: { _type: 'reference', _ref: asset._id } })
    } catch (err) {
      console.error('Upload failed:', err)
    }
    setUploading(false)
  }

  const handleRemove = () => {
    onChange({ _type: 'image', })
    setPreview(null)
  }

  const previewUrl = preview || (value?.asset?._ref
    ? `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${value.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`
    : null)

  return (
    <div style={{ fontSize: 11 }}>
      {previewUrl && (
        <img
          src={previewUrl}
          alt=''
          style={{ width: '100%', maxWidth: 120, display: 'block', marginBottom: 4 }}
        />
      )}
      {uploading
        ? <p>Uploading...</p>
        : <input type='file' accept='image/*' onChange={handleUpload} />
      }
      {value?.asset?._ref && !uploading && (
        <button onClick={handleRemove} style={{ marginTop: 4 }}>Remove</button>
      )}
    </div>
  )
}

export default SanityImageUpload