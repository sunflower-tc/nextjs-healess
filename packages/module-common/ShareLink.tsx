import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import { XSmIcon } from '@packages/module-theme/components/elements/XIcon';
import { WhatsApp, Mail, LinkedIn } from '@mui/icons-material';

interface SocialShareProps {
  link: string;
}

const socialLinks = [
  {
    name: 'Facebook',
    icon: <FacebookIcon className="text-[17px]" fontSize="small" />,
  },
  {
    name: 'Twitter',
    icon: <XSmIcon className="!text-black !text-[17px]" />,
  },
  {
    name: 'LinkedIn',
    icon: <LinkedIn className="!text-black !text-[17px]" />,
  },
  {
    name: 'Whatsapp',
    icon: <WhatsApp className="!text-black !text-[17px]" />,
  },
  {
    name: 'Mail',
    icon: <Mail className="!text-black !text-[17px]" />,
  },
];

const shareUrls: Record<string, (url: string) => string> = {
  Facebook: (url) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  Twitter: (url) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  LinkedIn: (url) =>
    `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`,
  Whatsapp: (url) =>
    `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  Mail: (url) =>
    `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`,
};

const SocialShare: React.FC<SocialShareProps> = ({ link }) => {
  if (!link || typeof link !== 'string' || !link.startsWith('http')) {
    console.warn('Invalid or missing URL for SocialShare component');
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pb-4 md:justify-start">
      {socialLinks.map((social, index) => {
        const shareFn = shareUrls[social.name];
        if (!shareFn || !social.icon) return null;

        return (
          <a
            key={index}
            href={shareFn(link)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 p-2 transition bg-gray-100 rounded-full hover:bg-gray-200"
            title={`Share on ${social.name}`}
          >
            {social.icon}
          </a>
        );
      })}
    </div>
  );
};

export default SocialShare;
