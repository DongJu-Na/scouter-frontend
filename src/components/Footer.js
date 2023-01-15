import React from "react";

function Footer() {
  return (
    <div className="footer">
      <ul className="footer__links">
        <li className="footer__links__item">
          <a href="mailto:ehdeld123@gmail.com">Business</a>
        </li>
        <li className="footer__links__item">
          <a href="mailto:ehdeld123@gmail.com">Advertise</a>
        </li>
        <li className="footer__links__item">
          <a href="mailto:ehdeld123@gmail.com">Feedback</a>
        </li>
      </ul>
      <div className="footer__copyright">
        © 2023 DongJu-Na , JungHo-Kim
        https://github.com/DongJu-Na/
        https://github.com/icon7777/
      </div>
      {/* 
          <ul className="footer__sns">
            <li className="footer__sns__item footer__sns__item--twitter">
              <a href="http://twitter.com/globalopgg/">
                <i>Twitter</i>
              </a>
            </li>
          </ul>      
      */}

    </div>
  );
};

export default Footer;