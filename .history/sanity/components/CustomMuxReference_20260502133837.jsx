import { useClient } from 'sanity'
import { useState, useEffect } from 'react'

const CustomMuxReference = ({ value, onChange }) => {
  const client = useClient({ apiVersion: '2023-01-01' })
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(null)

  useEffect(() => {
    if (value?._ref) {
      client.fetch(`*[_type == "video" && _id == $id][0].title`, { id: value._ref })
        .then(title => setSelectedTitle(title))
    }
  }, [value?._ref])

  useEffect(() => {
    if (!open) return
    const query = search
      ? `*[_type == "video" && title match $search] | order(title asc) [0...20] { _id, title }`
      : `*[_type == "video"] | order(title asc) [0...20] { _id, title }`
    client.fetch(query, { search: `${search}*` })
      .then(setResults)
  }, [search, open])

  const handleSelect = (e, doc) => {
    e.preventDefault()
    onChange({ _type: 'reference', _ref: doc._id })
    setSelectedTitle(doc.title)
    setOpen(false)
    setSearch('')
  }

  const handleRemove = (e) => {
    e.preventDefault()
    onChange(undefined)
    setSelectedTitle(null)
  }

  return (
    <div style={{ fontSize: 11 }}>
      {value?._ref ? (
        <div>
          <p style={{ margin: 0 }}>✅ {selectedTitle || value._ref}</p>
          <button onClick={(e) => handleRemove(e)} style={{ marginTop: 4 }}>Remove</button>
          <button onClick={(e) => setOpen(o => !o)} style={{ marginTop: 4, marginLeft: 4 }}>Change</button>
        </div>
      ) : (
        <button onClick={(e) => setOpen(o => !o)}>Select video</button>
      )}

      {open && (
        <div style={{
          border: '1px solid black',
          padding: 8,
          marginTop: 4,
          background: 'white',
          position: 'relative',
          zIndex: 100,
        }}>
          <input
            type='text'
            placeholder='Search videos...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 8, borderBottom: '1px solid black', border: 'none', borderBottom: '1px solid black' }}
            autoFocus
          />
          {results.length === 0 && (
            <p style={{ color: '#aaa' }}>No videos found</p>
          )}
          {results.map((doc) => (
            <div
              key={doc._id}
              onClick={(e) => handleSelect(e, doc)}
              style={{
                padding: '4px 0',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {doc.title || doc._id}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomMuxReference