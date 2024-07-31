function Map() {
  return (
    <div className="contact__map">
      <iframe
        className="contact__iframe"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
    &q=Space+Needle,Seattle+WA"
      ></iframe>
    </div>
  );
}

export default Map;
