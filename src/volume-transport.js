// Predict neighbouring IEEE-754 bit patterns using reversible uint32 arithmetic.
// Separate byte planes give gzip long runs of small, similar residuals.
const magic = 0x31564653; // SFV1, little endian
const headerBytes = 16;

export function packVolume(buffer, dims) {
  const words = new Uint32Array(buffer.slice(0));
  const [nx, ny, nz] = dims;
  if (words.length !== nx * ny * nz) throw new Error('Volume dimensions disagree with source');
  for (const stride of [1, nx, nx * ny]) {
    for (let i = words.length - 1; i >= stride; i--) words[i] -= words[i - stride];
  }
  const bytes = new Uint8Array(headerBytes + words.byteLength);
  const header = new DataView(bytes.buffer);
  [magic, nx, ny, nz].forEach((value, i) => header.setUint32(i * 4, value, true));
  for (let i = 0; i < words.length; i++) {
    const residual = (words[i] << 1) ^ (words[i] >> 31);
    for (let plane = 0; plane < 4; plane++) bytes[headerBytes + plane * words.length + i] = residual >>> (8 * plane);
  }
  return bytes;
}

export function unpackVolume(buffer) {
  const header = new DataView(buffer);
  if (buffer.byteLength < headerBytes || header.getUint32(0, true) !== magic) throw new Error('Unrecognized volume transport');
  const dims = [4, 8, 12].map(offset => header.getUint32(offset, true));
  const [nx, ny, nz] = dims, count = nx * ny * nz;
  if (dims.some(n => n < 2 || n > 512) || buffer.byteLength !== headerBytes + count * 4) throw new Error('Incomplete volume transport');
  const planes = new Uint8Array(buffer, headerBytes), words = new Uint32Array(count);
  for (let i = 0; i < count; i++) {
    const residual = planes[i] | (planes[count + i] << 8) | (planes[2 * count + i] << 16) | (planes[3 * count + i] << 24);
    words[i] = (residual >>> 1) ^ -(residual & 1);
  }
  for (const stride of [nx * ny, nx, 1]) {
    for (let i = stride; i < count; i++) words[i] += words[i - stride];
  }
  return words.buffer;
}
