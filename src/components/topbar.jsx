import styles from "./topbar.css";

export default function Topbar() {

    return (
        <header className="c-header headroom headroom--top headroom--not-bottom">
        <div className="language-translator">
          <div className="wrapper">
            <nav className="c-header__secondary">
              <ul id="menu-secondary-menu" className="c-header__list">
                <li className="c-header__item">
                  <a
                    href="https://testcenter.concentricbyginkgo.com/"
                    className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-4093 menu-item menu-item-type-custom menu-item-object-custom c-header__link"
                  >
                    Sign in
                  </a>
                </li>
                <li className="c-header__item">
                  <a
                    href="https://support.concentricbyginkgo.com/hc/en-us"
                    className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-1232 menu-item menu-item-type-custom menu-item-object-custom c-header__link"
                  >
                    Support
                  </a>
                </li>
                <li className="c-header__item">
                  <a
                    href="https://www.ginkgobioworks.com/careers/"
                    className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-4369 menu-item menu-item-type-custom menu-item-object-custom c-header__link"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </nav>
            <div
              className="gtranslate_wrapper gt_container--mvn65f"
              id="gt-wrapper-79703591"
            >
              {/* GTranslate: https://gtranslate.com */}
              <select
                className="gt_selector notranslate select2-hidden-accessible"
                aria-label="Select Language"
                data-select2-id="select2-data-1-pb0i"
                tabIndex={-1}
                style={{}}
                aria-hidden="true"
              >
                <option value="">Select Language</option>
                <option
                  value="en|en"
                  data-gt-href="#"
                  defaultValue=""
                  data-select2-id="select2-data-3-91m2"
                >
                  English
                </option>
                <option value="en|eo" data-gt-href="#">
                  Esperanto
                </option>
                <option value="en|et" data-gt-href="#">
                  Eesti
                </option>
                <option value="en|tl" data-gt-href="#">
                  Filipino
                </option>
                <option value="en|fi" data-gt-href="#">
                  Suomi
                </option>
                <option value="en|fr" data-gt-href="#">
                  Français
                </option>
              </select>
              <span
                className="select2 select2-container select2-container--default"
                dir="ltr"
                data-select2-id="select2-data-2-vki8"
                style={{ width: 181 }}
              >
                <span className="selection">
                  <span
                    className="select2-selection select2-selection--single"
                    role="combobox"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                    aria-disabled="false"
                    aria-labelledby="select2-ua76-container"
                    aria-controls="select2-ua76-container"
                  >
                    <span
                      className="select2-selection__rendered"
                      id="select2-ua76-container"
                      role="textbox"
                      aria-readonly="true"
                      title="English"
                    >
                      English
                    </span>
                    <span className="select2-selection__arrow" role="presentation">
                      <b role="presentation" />
                    </span>
                  </span>
                </span>
                <span className="dropdown-wrapper" aria-hidden="true" />
              </span>
              <div id="google_translate_element2">
                <div className="skiptranslate goog-te-gadget" dir="ltr" style={{}}>
                  <div id=":0.targetLanguage">
                    <select
                      className="goog-te-combo"
                      aria-label="Language Translate Widget"
                    >
                      <option value="">Select Language</option>
                      <option value="ko">Korean</option>
                      <option value="kri">Krio</option>
                      <option value="ku">Kurdish (Kurmanji)</option>
                      <option value="ckb">Kurdish (Sorani)</option>
                      <option value="ky">Kyrgyz</option>
                      <option value="lo">Lao</option>
                    </select>
                  </div>
                  Powered by{" "}
                  <span style={{ whiteSpace: "nowrap" }}>
                    <a
                      className="VIpgJd-ZVi9od-l4eHX-hSRGPd"
                      href="https://translate.google.com"
                      target="_blank"
                    >
                      <img
                        src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png"
                        width="37px"
                        height="14px"
                        style={{ paddingRight: 3 }}
                        alt="Google Translate"
                      />
                      Translate
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="o-row c-header__primary">
          <div className="o-col-12">
            <div className="c-header__inner">
              <a href="https://www.ginkgobiosecurity.com" className="c-header__logo">
                <img
                  className="desktop lightmode"
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-Horizontal-rich-black.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
                <img
                  className="mobile lightmode"
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-stacked-Rich-Black.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
                <img
                  className="mobile darkmode"
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-stacked-white.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
                <img
                  className="desktop darkmode"
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-Horizontal-white.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
              </a>
              <nav className="c-header__nav">
                <ul id="menu-main-menu" className="c-header__list">
                  <li className="c-header__item includes-flyout">
                    <a
                      href="#"
                      className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-4733 menu-item-has-children menu-item menu-item-type-post_type menu-item-object-page c-header__link"
                    >
                      Products
                    </a>
                    <ul className="c-header__submenu c-header__flyout small-flyout">
                      <li className="c-header__item">
                        <a
                          href="/canopy"
                          className="canopy menu-item menu-item-type-custom menu-item-object-custom menu-item-4734 c-header__link"
                        >
                          <span>Ginkgo Canopy</span>
                        </a>
                      </li>
                      <li className="c-header__item">
                        <a
                          href="/horizon"
                          className="horizon menu-item menu-item-type-custom menu-item-object-custom menu-item-4735 c-header__link"
                        >
                          <span>Ginkgo Horizon</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="c-header__item includes-flyout">
                    <a
                      href="#"
                      className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-3974 menu-item-has-children menu-item menu-item-type-post_type menu-item-object-page c-header__link"
                    >
                      Publications
                    </a>
                    <ul className="c-header__submenu c-header__flyout small-flyout">
                      <li className="c-header__item">
                        <a
                          href="/case-studies/"
                          className="case-studies menu-item menu-item-type-custom menu-item-object-custom menu-item-3253 c-header__link"
                        >
                          <span>Case Studies</span>
                        </a>
                      </li>
                      <li className="c-header__item">
                        <a
                          href="https://www.ginkgobiosecurity.com/research-articles/"
                          className="research menu-item menu-item-type-post_type menu-item-object-page menu-item-3973 c-header__link"
                        >
                          <span>Research Articles</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="c-header__item ">
                    <a
                      href="/category/all-posts/"
                      className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-418 menu-item menu-item-type-post_type menu-item-object-page c-header__link"
                    >
                      News
                    </a>
                  </li>
                  <li className="c-header__item ">
                    <a
                      href="https://www.ginkgobiosecurity.com/company/"
                      className=" menu-item menu-item-type-post_type menu-item-object-page menu-item-2715 menu-item menu-item-type-post_type menu-item-object-page c-header__link"
                    >
                      Company
                    </a>
                  </li>
                  <li className="c-header__item ">
                    <a
                      href="https://www.ginkgobiosecurity.com/contact/"
                      className=" menu-item menu-item-type-post_type menu-item-object-page menu-item-2716 menu-item menu-item-type-post_type menu-item-object-page c-header__link"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <button
                className="c-hamburger-icon c-hamburger-icon--slider js-hamburger-icon js-offcanvas-toggle"
                type="button"
              >
                <span className="c-hamburger-icon__box">
                  <span className="c-hamburger-icon__inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
}      