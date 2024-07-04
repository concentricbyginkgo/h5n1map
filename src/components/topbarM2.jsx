
import styles from './css/nav.module.css';
import s2 from './css/elements.css';
import s5 from './css/special3.css';


export default function Topbar() {

  return (
    <div className={styles.headControl + ' ' + styles.headContain + ' ' + styles['is--dark-mode']}>
      <header className={styles['c-header'] + ' ' + styles.headroom + ' ' + styles['headroom--top'] + ' ' + styles['headroom--not-bottom']}>
        <div className={styles['language-translator']} style={{ transitionDelay: "0ms !important" }}>
          <div className={styles.wrapper}>
            <nav className={styles['c-header__secondary']}>
              <ul id="menu-secondary-menu" className={styles['c-header__list']}>
                <li className={styles['c-header__item']}>
                  <a
                    href="https://testcenter.concentricbyginkgo.com/"
                    className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4093'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['c-header__link']}
                  >
                    Sign in
                  </a>
                </li>
                <li className={styles['c-header__item']}>
                  <a
                    href="https://support.concentricbyginkgo.com/hc/en-us"
                    className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-1232'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['c-header__link']}
                  >
                    Support
                  </a>
                </li>
                <li className={styles['c-header__item']}>
                  <a
                    href="https://www.ginkgobioworks.com/careers/"
                    className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4369'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['c-header__link']}
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </nav>
            <div
              className={styles.gtranslate_wrapper + ' ' + styles['gt_container--mvn65f']}
              id="gt-wrapper-79703591"
            >
              {/* GTranslate: https://gtranslate.com */}
              <select
                className={styles.gt_selector + ' ' + styles.notranslate + ' ' + styles['select2-hidden-accessible']}
                aria-label="Select Language"
                data-select2-id="select2-data-1-pb0i"
                tabIndex={-1}
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
                className={styles.select2 + ' ' + styles['select2-container'] + ' ' + styles['select2-container--default']}
                dir="ltr"
                data-select2-id="select2-data-2-vki8"
                style={{ width: 181 }}
              >
                <span className={styles.selection}>
                  <span
                    className={styles['select2-selection'] + ' ' + styles['select2-selection--single']}
                    role="combobox"
                    aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex={0}
                    aria-disabled="false"
                    aria-labelledby="select2-ua76-container"
                    aria-controls="select2-ua76-container"
                  >
                    <span
                      className={styles['select2-selection__rendered']}
                      id="select2-ua76-container"
                      role="textbox"
                      aria-readonly="true"
                      title="English"
                    >
                      English
                    </span>
                    <span className={styles['select2-selection__arrow']} role="presentation">
                      <b role="presentation" />
                    </span>
                  </span>
                </span>
                <span className={styles['dropdown-wrapper']} aria-hidden="true" />
              </span>
              <div id="google_translate_element2">
                <div className={styles.skiptranslate + ' ' + styles['goog-te-gadget']} dir="ltr">
                  <div id=":0.targetLanguage">
                    <select
                      className={styles['goog-te-combo']}
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
                      className={styles['VIpgJd-ZVi9od-l4eHX-hSRGPd']}
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
        <div className={styles['o-row'] + ' ' + styles['c-header__primary']} style={{ transitionDelay: "0ms !important" }}>
          <div className={styles['o-col-12']}>
            <div className={styles['c-header__inner']}>
              <a href="https://www.ginkgobiosecurity.com" className={styles['c-header__logo']}>
                <img
                  className={styles.desktop + ' ' + styles.lightmode}
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-Horizontal-rich-black.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
                <img
                  className={styles.mobile + ' ' + styles.lightmode}
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-stacked-Rich-Black.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
                <img
                  className={styles.mobile + ' ' + styles.darkmode}
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-stacked-white.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
                <img
                  className={styles.desktop + ' ' + styles.darkmode}
                  src="https://www.ginkgobiosecurity.com/wp-content/uploads/2024/03/Ginkgo-BS-Logo-Lockup-Horizontal-white.svg"
                  alt=""
                  loading="eager"
                  width={200}
                  height={50}
                />
              </a>
              <nav className={styles['c-header__nav']}>
                <ul id="menu-main-menu" className={styles['c-header__list']}>
                  <li className={styles['c-header__item'] + ' ' + styles['includes-flyout']}>
                    <a
                      href="#"
                      className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4733'] + ' ' + styles['menu-item-has-children'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-header__link']}
                    >
                      Products
                    </a>
                    <ul className={styles['c-header__submenu'] + ' ' + styles['c-header__flyout'] + ' ' + styles['small-flyout']}>
                      <li className={styles['c-header__item']}>
                        <a
                          href="https://www.ginkgobiosecurity.com/canopy"
                          className={styles.canopy + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4734'] + ' ' + styles['c-header__link']}
                        >
                          <span>Ginkgo Canopy</span>
                        </a>
                      </li>
                      <li className={styles['c-header__item']}>
                        <a
                          href="https://www.ginkgobiosecurity.com/horizon"
                          className={styles.horizon + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4735'] + ' ' + styles['c-header__link']}
                        >
                          <span>Ginkgo Horizon</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['c-header__item'] + ' ' + styles['includes-flyout']}>
                    <a
                      href="#"
                      className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-3974'] + ' ' + styles['menu-item-has-children'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-header__link']}
                    >
                      Publications
                    </a>
                    <ul className={styles['c-header__submenu'] + ' ' + styles['c-header__flyout'] + ' ' + styles['small-flyout']}>
                      <li className={styles['c-header__item']}>
                        <a
                          href="https://www.ginkgobiosecurity.com/case-studies/"
                          className={styles['case-studies'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-3253'] + ' ' + styles['c-header__link']}
                        >
                          <span>Case Studies</span>
                        </a>
                      </li>
                      <li className={styles['c-header__item']}>
                        <a
                          href="https://www.ginkgobiosecurity.com/research-articles/"
                          className={styles.research + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['menu-item-3973'] + ' ' + styles['c-header__link']}
                        >
                          <span>Research Articles</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className={styles['c-header__item']}>
                    <a
                      href="https://www.ginkgobiosecurity.com/category/all-posts/"
                      className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-418'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-header__link']}
                    >
                      News
                    </a>
                  </li>
                  <li className={styles['c-header__item']}>
                    <a
                      href="https://www.ginkgobiosecurity.com/company/"
                      className={styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['menu-item-2715'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-header__link']}
                    >
                      Company
                    </a>
                  </li>
                  <li className={styles['c-header__item']}>
                    <a
                      href="https://www.ginkgobiosecurity.com/contact/"
                      className={styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['menu-item-2716'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-header__link']}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <button
                className={styles['c-hamburger-icon'] + ' ' + styles['c-hamburger-icon--slider'] + ' ' + styles['js-hamburger-icon'] + ' ' + styles['js-offcanvas-toggle']}
                type="button"
              >
                <span className={styles['c-hamburger-icon__box']}>
                  <span className={styles['c-hamburger-icon__inner']} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={styles['c-offcanvas'] + ' ' + styles['is-active']}>
        <div className={styles['c-offcanvas__inner']}>
          <div className={styles['o-container']}>
            <div className={styles['o-row']}>
              <div className={styles['o-col-12']}>

                <nav className={styles['c-offcanvas__nav']}>

                  <ul id="menu-main-menu-1" className={styles['c-offcanvas__list']}>
                    <li className={styles['c-offcanvas__item'] + ' ' + styles['includes-flyout']}>
                      <a href="#" className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4733'] + ' ' + styles['menu-item-has-children'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-offcanvas__link']}>Products</a>

                      <ul className={styles['c-header__submenu'] + ' ' + styles['c-header__flyout']}>
                        <div className={styles.flyout__inner}>
                          <li className={styles['c-header__item']}>
                            <a href="https://www.ginkgobiosecurity.com/canopy" className={styles.canopy + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4734'] + ' ' + styles['c-header__link']}>
                              <span>Ginkgo Canopy</span>
                            </a>
                          </li>
                          <li className={styles['c-header__item']}>
                            <a href="https://www.ginkgobiosecurity.com/horizon" className={styles.horizon + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-4735'] + ' ' + styles['c-header__link']}>
                              <span>Ginkgo Horizon</span>
                            </a>
                          </li>
                        </div>
                      </ul>

                    </li>
                    <li className={styles['c-offcanvas__item'] + ' ' + styles['includes-flyout']}>
                      <a href="#" className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-3974'] + ' ' + styles['menu-item-has-children'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-offcanvas__link']}>Publications</a>

                      <ul className={styles['c-header__submenu'] + ' ' + styles['c-header__flyout']}>
                        <div className={styles.flyout__inner}>
                          <li className={styles['c-header__item']}>
                            <a href="https://www.ginkgobiosecurity.com/case-studies/" className={styles['case-studies'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-3253'] + ' ' + styles['c-header__link']}>
                              <span>Case Studies</span>
                            </a>
                          </li>
                          <li className={styles['c-header__item']}>
                            <a href="https://www.ginkgobiosecurity.com/research-articles/" className={styles.research + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['menu-item-3973'] + ' ' + styles['c-header__link']}>
                              <span>Research Articles</span>
                            </a>
                          </li>
                        </div>
                      </ul>

                    </li>
                    <li className={styles['c-offcanvas__item']}>
                      <a href="https://www.ginkgobiosecurity.com/category/all-posts/" className={styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['menu-item-418'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-offcanvas__link']}>News</a>


                    </li>
                    <li className={styles['c-offcanvas__item']}>
                      <a href="https://www.ginkgobiosecurity.com/company/" className={styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['menu-item-2715'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-offcanvas__link']}>Company</a>


                    </li>
                    <li className={styles['c-offcanvas__item']}>
                      <a href="https://www.ginkgobiosecurity.com/contact/" className={styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['menu-item-2716'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-post_type'] + ' ' + styles['menu-item-object-page'] + ' ' + styles['c-offcanvas__link']}>Contact</a>


                    </li>
                  </ul></nav>

                <nav className={styles['c-header__secondary']}>
                  <ul id="menu-secondary-menu-1" className={styles['c-offcanvas__list']}>
                    <li className={styles['c-header__item'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['c-header__link']}><a href="https://testcenter.concentricbyginkgo.com/" className=" menu-item menu-item-type-custom menu-item-object-custom c-header__link">Sign in</a></li>
                    <li className={styles['c-header__item'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['c-header__link']}><a href="https://support.concentricbyginkgo.com/hc/en-us" className=" menu-item menu-item-type-custom menu-item-object-custom c-header__link">Support</a></li>
                    <li className={styles['c-header__item'] + ' ' + styles['menu-item'] + ' ' + styles['menu-item-type-custom'] + ' ' + styles['menu-item-object-custom'] + ' ' + styles['c-header__link']}><a href="https://www.ginkgobioworks.com/careers/" className=" menu-item menu-item-type-custom menu-item-object-custom c-header__link">Careers</a></li>
                  </ul>
                  <div className={styles.gtranslate_wrapper + ' ' + styles['gt_container-voqqb9'] + ' ' + styles.gt_selector + ' ' + styles.notranslate + ' ' + styles['select2-hidden-accessible'] + ' ' + styles.select2 + ' ' + styles['select2-container'] + ' ' + styles['select2-container--default'] + ' ' + styles.selection + ' ' + styles['select2-selection'] + ' ' + styles['select2-selection--single'] + ' ' + styles['select2-selection__rendered'] + ' ' + styles['select2-selection__arrow'] + ' ' + styles['dropdown-wrapper']} id="gt-wrapper-78373858"><select className="gt_selector notranslate select2-hidden-accessible" aria-label="Select Language" data-select2-id="select2-data-4-rc50" tabIndex="-1" aria-hidden="true"><option value="">Select Language</option><option value="en|af" data-gt-href="#">Afrikaans</option><option value="en|zu" data-gt-href="#">Zulu</option></select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-5-3vsx" style={{ width: "181px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-kqoj-container" aria-controls="select2-kqoj-container"><span className="select2-selection__rendered" id="select2-kqoj-container" role="textbox" aria-readonly="true" title="English">English</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span><div id="google_translate_element2"></div></div>
                </nav>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}      