import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Download } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';
import { Header } from './components/header';

export function App() {
  const [link, setLink] = useState('');
  const [qrcodePngLink, setQrcodePngLink] = useState('');
  const [qrcodeSvgLink, setQrcodeSvgLink] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  function handleGenerate(linkUrl: string) {
    QRCodeLink.toDataURL(linkUrl, {
      width: 300,
      margin: 1,
    })
      .then((url: string) => {
        setQrcodePngLink(url);
      })
      .catch((err: Error) => {
        console.error(err);
      });

    QRCodeLink.toString(linkUrl, { type: 'svg' })
      .then((url: string) => {
        setQrcodeSvgLink(`data:image/svg+xml;base64,${btoa(url)}`);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  function handleQrcode(event: ChangeEvent<HTMLInputElement>) {
    const newLink = event.target.value;
    setLink(newLink);
    handleGenerate(newLink);
  }

  function toggleDarkMode() {
    setIsDarkMode(prevMode => !prevMode);
  }

  function handleDownload(format: string) {
    const a = document.createElement('a');
    if (format === 'png') {
      a.href = qrcodePngLink;
      a.download = 'qrcode.png';
    } else if (format === 'svg') {
      a.href = qrcodeSvgLink;
      a.download = 'qrcode.svg';
    }
    a.click();

    toast.success(`Download ${format.toUpperCase()} iniciado!`);
  }

  return (
    <section className="min-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300 ease-in-out">
      <Header onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main
        style={{ height: 'calc(100vh - 80px)' }}
        className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text p-4 flex items-center justify-center"
      >
        <div className="max-w-md w-full border border-gray-300 dark:border-gray-700 bg-light-background dark:bg-dark-secondary rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full flex justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-xl">
            {/* Tornando o tamanho do QR Code responsivo */}
            <QRCode value={link} size={window.innerWidth < 640 ? 250 : 350} />
          </div>

          <div className="w-full m-4 flex flex-col gap-2">
            <label
              htmlFor="link-qrcode"
              className="text-gray-900 dark:text-gray-100"
            >
              Insira seu link
            </label>

            <div className="flex rounded-lg bg-light-secondary dark:bg-dark-background text-light-text dark:text-dark-text border border-gray-300 dark:border-gray-700">
              <input
                type="text"
                id="link-qrcode"
                value={link}
                onChange={handleQrcode}
                placeholder="Digite seu link"
                className="w-full bg-transparent p-3 rounded text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400"
              />

              <Toaster />
            </div>

            <div className="w-full flex items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => handleDownload('png')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-light-button dark:bg-dark-button hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transition-colors duration-300 ease-in-out ${
                  link.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={link.trim() === ''}
              >
                <Download className="text-light-icon dark:text-dark-icon" />
                <span>PNG</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('svg')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-light-button dark:bg-dark-button hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transition-colors duration-300 ease-in-out ${
                  link.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={link.trim() === ''}
              >
                <Download className="text-light-icon dark:text-dark-icon" />
                <span>SVG</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
