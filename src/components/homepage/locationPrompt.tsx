interface LocationPromptProps {
  onAllow: (allow: boolean) => void;
}

export default function LocationPrompt({ onAllow }: LocationPromptProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Izinkan Akses Lokasi?
        </h2>
        <p className="text-gray-600 mb-6">
          Dengan mengizinkan akses lokasi, kami dapat menampilkan pekerjaan yang tersedia di sekitar Anda.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onAllow(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Tampilkan Semua
          </button>
          <button
            onClick={() => onAllow(true)}
            className="px-4 py-2 bg-[#0D3880] text-white rounded hover:bg-[#0D3880]/90 transition-colors"
          >
            Izinkan Lokasi
          </button>
        </div>
      </div>
    </div>
  );
}