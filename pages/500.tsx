import dynamic from 'next/dynamic';
const Server = dynamic(() => import('@voguish/module-theme/pages/Server'));

export default function ServerError() {
  return (
    <>
      <Server />
    </>
  );
}
