// ===============================
// 📦 FILE TYPES CONSTANTS BY Nu'man Nasyar MZ
// ===============================
export const FILE_TYPES = {
  IMAGE: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml',
    'image/tiff',
    'image/x-icon',
    'image/heif',
    'image/heic',
    'image/avif',
  ],

  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
  ],

  VIDEO: [
    'video/mp4',
    'video/mpeg',
    'video/ogg',
    'video/webm',
    'video/x-msvideo',
    'video/3gpp',
    'video/3gpp2',
  ],

  AUDIO: [
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/webm',
    'audio/aac',
    'audio/flac',
    'audio/mp4',
  ],

  ARCHIVE: [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/x-tar',
    'application/gzip',
  ],
}

// ===============================
// 🧠 HELPER FUNCTION
// ===============================
/**
 * Ambil daftar MIME type berdasarkan kategori tertentu.
 * Contoh:
 * const accepted = getAcceptedFileTypes(['DOCUMENT', 'IMAGE']);
 */
export function getAcceptedFileTypes(categories = []) {
  return categories.flatMap((cat) => FILE_TYPES[cat] || [])
}
