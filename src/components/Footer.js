import React from "react";

function Footer() {
  return (
    <div className="footer">
      <ul className="footer__links">
        <li className="footer__links__item">
          <a href="https://www.op.gg/about/">About OP.GG</a>
        </li>
        <li className="footer__links__item">
          <a href="https://www.op.gg/about/logos/">Logo History</a>
        </li>
        <li className="footer__links__item">
          <b>
            <a href="https://www.op.gg/about/privacy/">Privacy Policy</a>
          </b>
        </li>
        <li className="footer__links__item">
          <a href="https://opgg.helpscoutdocs.com/collection/1-opgg">Help</a>
        </li>
        <li className="footer__links__item">
          <a href="mailto:contact@op.gg">Business</a>
        </li>
        <li className="footer__links__item">
          <a href="mailto:ads@op.gg">Advertise</a>
        </li>
        <li className="footer__links__item">
          <a href="mailto:service@op.gg">Feedback</a>
        </li>
      </ul>
      <div className="footer__copyright">
        © 2012-2021 OP.GG. OP.GG isn’t endorsed by Riot Games and doesn’t
        reflect the views or opinions of Riot Games or anyone officially
        involved in producing or managing League of Legends. League of Legends
        and Riot Games are trademarks or registered trademarks of Riot Games,
        Inc. League of Legends © Riot Games, Inc.
      </div>
      <ul className="footer__sns">
        <li className="footer__sns__item footer__sns__item--twitter">
          <a href="http://twitter.com/globalopgg/">
            <i>Twitter</i>
          </a>
        </li>
        <li className="footer__sns__item footer__sns__item--instagram">
          <a href="https://www.instagram.com/opgginc/">
            <i>Instagram</i>
          </a>
        </li>
        <li className="footer__sns__item footer__sns__item--facebook">
          <a href="https://www.facebook.com/lolopgg/">
            <i>Facebook</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;