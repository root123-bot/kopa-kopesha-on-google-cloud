import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import { Link } from "../routes";
import styles from "../static/css/index.module.css";
import Image from "next/image";

class NavBar extends Component {
  // In next.js relative path of the image is started with "/" and not ..
  // In next stling of margin is not working in built in Image component na hii
  // ndo inayonisumbua kwangu... to achieve ur functionality wrap Image inside div
  // and add some margin from here... this is a link for more https://stackoverflow.com/questions/65527407/next-image-not-taking-class-properties
  // HIi ABOUT US ilikua inacollapse in two lines so to achieve full word in one line I use white-space: nowrap, see in
  // index.module.css... for more this is a link https://css-tricks.com/almanac/properties/w/whitespace/
  /* 
                       <div className={styles.behave-as-nav}>
                        <div className={styles.input-div}>
                            <form className={styles.inline-form}>
                                <p className={styles.brand}>BRAND</p>
                                <input type="text" placeholder='Search artist/music' id='search' />
                                <img src = '' alt='search-icon' className='search-icon' title='Search' />
                                <Link route='https://www.google.com/'>
                                    <a className='btn sbu font-weight-bold'>Sign up</a>
                                </Link>
                                <Link route='https://www.yahoo.com/'>
                                    <a className='btn sbu font-weight-bold'>Login</a>
                                </Link>
                                <button className='btn btn-dark btn-lg rounded-pill down' id='for-cont-ar'>
                                    <div className='button_cont'>
                                        <Link route = 'https://instagram.com/'>
                                            <a className={styles.example_f} target='' rel="nofollow" style = {this.btnStyle}>
                                                <span /> Artist/Demystifier
                                            </a>
                                        </Link>    
                                    </div>
                                </button>
                            </form>    
                        </div>    
                    </div> 
    */
  render() {
    return (
      <Container>
        <Head>
          <title>Kopa | Lipa</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link>
        </Head>

        <section className={styles.sectionStyle}>
          <div className={styles.behaveLikenav}>
            <div>
              <form className={styles.inlineForm}>
                <p className={styles.brand}>BRAND</p>
                <input
                  type="text"
                  placeholder="Search contract or borrower address..."
                  id={styles.search}
                />
                <img
                  src="/static/images/magnifying-glass.png"
                  alt="search-icon"
                  height={33}
                  width={33}
                  className={styles.searchIcon}
                  title="Search"
                />
                <Link route="https://www.google.com">
                  <a className={styles.aboutUs}>
                    <span>ABOUT US</span>
                  </a>
                </Link>
                <Link route="https://www.instagram.com/">
                  <a className={styles.aboutGuide}>
                    <span>GUIDE</span>
                  </a>
                </Link>
                <Link route="/profile/">
                  <img
                    src="/static/images/user-grey.png"
                    alt="Profile"
                    height={40}
                    width={40}
                    className={styles.proPic}
                    title="Profile"
                  />
                </Link>
              </form>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}

export default NavBar;
