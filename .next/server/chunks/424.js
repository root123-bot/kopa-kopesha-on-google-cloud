exports.id = 424;
exports.ids = [424];
exports.modules = {

/***/ 389:
/***/ ((module) => {

// Exports
module.exports = {
	"sectionStyle": "css_sectionStyle__PYmYm",
	"behaveLikenav": "css_behaveLikenav__E4R9A",
	"inlineForm": "css_inlineForm__yG3Us",
	"brand": "css_brand__AahfS",
	"search": "css_search__gz_NK",
	"searchIcon": "css_searchIcon__l0aLC",
	"aboutUs": "css_aboutUs__CsMw0",
	"proPic": "css_proPic__7xk1U",
	"aboutGuide": "css_aboutGuide__ThVPH"
};


/***/ }),

/***/ 2424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1831);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(262);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(389);
/* harmony import */ var _static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);







class NavBar extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
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
    */ render() {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__.Container, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "Kopa | Lipa"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                            rel: "stylesheet",
                            href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
                            integrity: "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",
                            crossOrigin: "anonymous"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                            rel: "stylesheet",
                            href: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                    className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().sectionStyle),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().behaveLikenav),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().inlineForm),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().brand),
                                        children: "BRAND"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "text",
                                        placeholder: "Search contract or borrower address...",
                                        id: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().search)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "/static/images/magnifying-glass.png",
                                        alt: "search-icon",
                                        height: 33,
                                        width: 33,
                                        className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().searchIcon),
                                        title: "Search"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_routes__WEBPACK_IMPORTED_MODULE_4__.Link, {
                                        route: "https://www.google.com",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().aboutUs),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "ABOUT US"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_routes__WEBPACK_IMPORTED_MODULE_4__.Link, {
                                        route: "https://www.instagram.com/",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().aboutGuide),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "GUIDE"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_routes__WEBPACK_IMPORTED_MODULE_4__.Link, {
                                        route: "/profile/",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/static/images/user-grey.png",
                                            alt: "Profile",
                                            height: 40,
                                            width: 40,
                                            className: (_static_css_index_module_css__WEBPACK_IMPORTED_MODULE_6___default().proPic),
                                            title: "Profile"
                                        })
                                    })
                                ]
                            })
                        })
                    })
                })
            ]
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavBar);


/***/ }),

/***/ 262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const routes = __webpack_require__(662)();
routes.add("/campaigns/new", "/campaigns/new").add("/profile/:address", "/pro/").add("/profile/:address/borrow", "/borrow/").add("/campaigns/:address/requests", "/campaigns/requests/index") // Hii vilevile  mtu akiclick /campaigns/<address:int>/requests basi itaenda kwenye campaigns/requests/index
.add("/campaigns/:address/requests/new", "/campaigns/requests/new");
module.exports = routes;


/***/ })

};
;