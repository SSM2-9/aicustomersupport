import { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    // Load the weather widget script
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/en/48d862d35/paris/"
        data-label_1="PARIS"
        data-label_2="WEATHER"
        data-theme="original"
      >
        PARIS WEATHER
      </a>
    </div>
  );
};

export default WeatherWidget;
