// /next/pages/api/log-test.js
export default function handler(req, res) {
  console.log('🔥 log-test hit!', {
    method: req.method,
    time: new Date().toISOString(),
  })

  return res.status(200).json({ ok: true })
}
