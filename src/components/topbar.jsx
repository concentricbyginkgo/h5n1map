//import styles from './topbar.css';
import s1 from './css/nav.css';
import s2 from './css/elements.css';
import s3 from './css/special3.css';

export default function Topbar() {

  return (
    <div className="headControl headContain">
      <header className="c-header headroom headroom--top headroom--not-bottom">
        <div className="language-translator" style={{ transitionDelay: "0ms !important" }}>
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

          </div>
        </div>
        <div className="o-row c-header__primary" style={{ transitionDelay: "0ms !important" }}>
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
                          href="https://www.ginkgobiosecurity.com/canopy"
                          className="canopy menu-item menu-item-type-custom menu-item-object-custom menu-item-4734 c-header__link"
                        >
                          <span>Ginkgo Canopy</span>
                        </a>
                      </li>
                      <li className="c-header__item">
                        <a
                          href="https://www.ginkgobiosecurity.com/horizon"
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
                          href="https://www.ginkgobiosecurity.com/case-studies/"
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
                      href="https://www.ginkgobiosecurity.com/category/all-posts/"
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
      <div className="c-offcanvas is-active">
        <div className="c-offcanvas__inner">
          <div className="o-container">
            <div className="o-row">
              <div className="o-col-12">

                <nav className="c-offcanvas__nav">

                  <ul id="menu-main-menu-1" className="c-offcanvas__list">
                    <li className="c-offcanvas__item includes-flyout">
                      <a href="#" className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-4733 menu-item-has-children menu-item menu-item-type-post_type menu-item-object-page c-offcanvas__link">Products</a>

                      <ul className="c-header__submenu c-header__flyout">
                        <div className="flyout__inner">
                          <li className="c-header__item">
                            <a href="https://www.ginkgobiosecurity.com/canopy" className="canopy menu-item menu-item-type-custom menu-item-object-custom menu-item-4734 c-header__link">
                              <span>Ginkgo Canopy</span>
                            </a>
                          </li>
                          <li className="c-header__item">
                            <a href="https://www.ginkgobiosecurity.com/horizon" className="horizon menu-item menu-item-type-custom menu-item-object-custom menu-item-4735 c-header__link">
                              <span>Ginkgo Horizon</span>
                            </a>
                          </li>
                        </div>
                      </ul>

                    </li>
                    <li className="c-offcanvas__item includes-flyout">
                      <a href="#" className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-3974 menu-item-has-children menu-item menu-item-type-post_type menu-item-object-page c-offcanvas__link">Publications</a>

                      <ul className="c-header__submenu c-header__flyout">
                        <div className="flyout__inner">
                          <li className="c-header__item">
                            <a href="https://www.ginkgobiosecurity.com/case-studies/" className="case-studies menu-item menu-item-type-custom menu-item-object-custom menu-item-3253 c-header__link">
                              <span>Case Studies</span>
                            </a>
                          </li>
                          <li className="c-header__item">
                            <a href="https://www.ginkgobiosecurity.com/research-articles/" className="research menu-item menu-item-type-post_type menu-item-object-page menu-item-3973 c-header__link">
                              <span>Research Articles</span>
                            </a>
                          </li>
                        </div>
                      </ul>

                    </li>
                    <li className="c-offcanvas__item ">
                      <a href="https://www.ginkgobiosecurity.com/category/all-posts/" className=" menu-item menu-item-type-custom menu-item-object-custom menu-item-418 menu-item menu-item-type-post_type menu-item-object-page c-offcanvas__link">News</a>


                    </li>
                    <li className="c-offcanvas__item ">
                      <a href="https://www.ginkgobiosecurity.com/company/" className=" menu-item menu-item-type-post_type menu-item-object-page menu-item-2715 menu-item menu-item-type-post_type menu-item-object-page c-offcanvas__link">Company</a>


                    </li>
                    <li className="c-offcanvas__item ">
                      <a href="https://www.ginkgobiosecurity.com/contact/" className=" menu-item menu-item-type-post_type menu-item-object-page menu-item-2716 menu-item menu-item-type-post_type menu-item-object-page c-offcanvas__link">Contact</a>


                    </li>
                  </ul></nav>

                <nav className="c-header__secondary">
                  <ul id="menu-secondary-menu-1" className="c-offcanvas__list">
                    <li className="c-header__item"><a href="https://testcenter.concentricbyginkgo.com/" className=" menu-item menu-item-type-custom menu-item-object-custom c-header__link">Sign in</a></li>
                    <li className="c-header__item"><a href="https://support.concentricbyginkgo.com/hc/en-us" className=" menu-item menu-item-type-custom menu-item-object-custom c-header__link">Support</a></li>
                    <li className="c-header__item"><a href="https://www.ginkgobioworks.com/careers/" className=" menu-item menu-item-type-custom menu-item-object-custom c-header__link">Careers</a></li>
                  </ul>

                </nav>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}      