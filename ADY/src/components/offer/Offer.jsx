import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Save from "../../assets/save.png";
import { FaCopy } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const Offer = () => {
  const [copied, setCopied] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(code);
        setTimeout(() => {
          setCopied(null);
        }, 2000);
      })
      .catch((err) => {
        console.log('Failed to copy', err);
      });
  };

  const offers = [
    { discount: '30%', code: 'LIIFG', descriptionKey: '30%' },
    { discount: '50%', code: 'DIMYL', descriptionKey: '50%' }
  ];

  return (
    <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-[8ch]'>
      <div className="w-full items-center flex justify-between">
        <h1 className="text-2xl font-medium mb-6">{t('offer')}</h1>
        <Link to={"/offer"} className='text-violet-600'>{t('view all')}</Link>
      </div>
      <div className="grid grid-cols-2 gap-16">
        {offers.map((offer, index) => (
          <div key={index} className="w-full h-auto rounded-xl bg-zinc-200/30 dark:bg-zinc-800/20 p-8 flex items-center gap-x-3 shadow-md">
            <img src={Save} alt="save img" className="w-52 aspect-[2/1] object-contain object-center" />
            <div className="flex flex-1 flex-col space-y-5">
              <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                {t(offer.descriptionKey)}
              </h1>
              <div className="flex items-center gap-x-5">
                <div className="w-fit border border-dashed px-4 py-1 border-neutral-300 dark:border-neutral-800 bg-violet-500/10 dark:bg-violet-800/5 rounded-md p-3">
                  {copied === offer.code ? (
                    <span className="text-green-600">{t('copied')}</span>
                  ) : (
                    <span className="text-violet-600">{offer.code}</span>
                  )}
                </div>
                <button onClick={() => handleCopy(offer.code)} className="text-xl text-violet-600">
                  <FaCopy />
                </button>
              </div>
              <p className="text-sm text-neutral-400 dark:text-neutral-600 font-normal">
                {t('valid')} <span className="text-sm font-medium">27 {t("december")} </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
