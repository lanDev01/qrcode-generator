import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Download } from 'lucide-react';

import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';
import { Header } from './components/header';

export function App() {
  const [link, setLink] = useState('');
  const [qrcodeLink, setQrcodeLink] = useState('');
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
        setQrcodeLink(url);
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

  return (
    <section className="max-h-screen bg-light-background dark:bg-dark-background transition-colors duration-300 ease-in-out">
      <Header onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main
        style={{ height: 'calc(100vh - 80px)' }}
        className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg p-6 flex items-center justify-center transition-colors duration-300 ease-in-out"
      >
        <div className="max-w-md w-full h-3/4 border border-gray-300 dark:border-gray-700 bg-light-background dark:bg-dark-secondary rounded-lg shadow-lg flex flex-col items-center justify-center transition-colors duration-300 ease-in-out">
          {/* Removi o título para manter o foco no QR Code */}
          <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-xl">
            <QRCode value={link} size={350} />
          </div>

          <div className="w-full m-4 p-6 flex flex-col gap-2">
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
                className="w-full bg-transparent p-3 rounded text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 ease-in-out"
              />

              <button
                type="button"
                className="px-4 py-2 rounded-r-lg bg-light-button dark:bg-dark-button hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transition-colors duration-300 ease-in-out"
              >
                <a href={qrcodeLink} download="qrcode.png">
                  <Download className="text-light-icon dark:text-dark-icon" />
                </a>
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
