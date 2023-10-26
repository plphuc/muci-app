const WelcomeImage = ({width = '852px', height = '260', className}) => (
  <img
    alt=""
    fetchpriority="high"
    loading="eager"
    width={width}
    height={height}
    decoding="async"
    data-nimg="1"
    className={className}
    style={{
      color: 'transparent',
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'contain',
      objectPosition: 'center 9px',
    }}
    src="https://www.notion.so/cdn-cgi/image/format=webp,width=1080,quality=80/front-static/pages/home/home-hero.png"
    data-airgap-id="55"
  ></img>
);

export default WelcomeImage;
