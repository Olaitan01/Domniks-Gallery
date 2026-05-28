const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const srcDir = path.join(__dirname, '..', 'src', 'assets')
const outDir = path.join(__dirname, '..', 'src', 'assets', 'optimized')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const sizes = [400, 800, 1200, 1600]

async function processFile(file) {
  const ext = path.extname(file).toLowerCase()
  const base = path.basename(file, ext)
  const input = path.join(srcDir, file)

  // Skip small icons and svgs
  if (ext === '.svg' || file.toLowerCase().includes('favicon')) return

  try {
    const image = sharp(input)
    const metadata = await image.metadata()
    for (const w of sizes) {
      if (w > metadata.width) continue
      const outJpg = path.join(outDir, `${base}-${w}.jpg`)
      const outWebp = path.join(outDir, `${base}-${w}.webp`)

      await image.resize(w).jpeg({ quality: 80 }).toFile(outJpg)
      await image.resize(w).webp({ quality: 75 }).toFile(outWebp)
      console.log('Wrote', outJpg, outWebp)
    }
  } catch (err) {
    console.error('Failed', file, err)
  }
}

fs.readdir(srcDir, (err, files) => {
  if (err) throw err
  Promise.all(files.map(processFile)).then(() => console.log('Done'))
})
