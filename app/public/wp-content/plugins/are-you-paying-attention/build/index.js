/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");

// CHECK OUT WordPress React Components before building from scratch!!

 // IIFE - Immediately Invoked Function Expression

(function () {
  let locked = false; // trigger every time a block on the page updates

  wp.data.subscribe(function () {
    const result = wp.data.select('core/block-editor').getBlocks().filter(function (block) {
      return block.name == 'outplugin/are-you-paying-attention' && block.attributes.correctAnswer == undefined;
    }); //filter should be empty, unless the a correct-answer field is unset on an instance of this block

    if (result.length && locked == false) {
      // DONT ALLOW Update Post
      locked = true;
      wp.data.dispatch('core/editor').lockPostSaving('noanswer');
    }

    if (!result.length && locked) {
      // ALLOW to Update Post
      locked = false;
      wp.data.dispatch('core/editor').unlockPostSaving('noanswer');
    }
  });
})();

wp.blocks.registerBlockType('outplugin/are-you-paying-attention', {
  title: 'Are You Paying Attention?',
  icon: 'smiley',
  category: 'common',
  attributes: {
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      default: ['']
    },
    correctAnswer: {
      type: 'number',
      default: undefined
    }
  },
  // React Component!
  edit: EditComponent,
  // React Component!
  save: function (props) {
    return null; //let PHP handle saved block to update block without having to update post in admin
  }
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({
      question: value
    });
  }

  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(function (x, index) {
      return index != indexToDelete;
    });
    props.attributes.correctAnswer === indexToDelete && props.setAttributes({
      correctAnswer: undefined
    });
    props.setAttributes({
      answers: newAnswers
    });
  }

  function markAsCorrect(index) {
    props.setAttributes({
      correctAnswer: index
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "paying-attention-edit-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: props.attributes.question,
    onChange: updateQuestion,
    label: "Question:",
    style: {
      fontSize: '20px'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      fontSize: '13px',
      margin: '20px 0 8px 0'
    }
  }, "Answers:"), props.attributes.answers.map(function (answer, index) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexBlock, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      autoFocus: answer === undefined,
      value: answer,
      onChange: newValue => {
        const newAnswers = props.attributes.answers.concat([]);
        newAnswers[index] = newValue;
        props.setAttributes({
          // SET ATTRIBUTES = UPDATE STATE (live)
          answers: newAnswers
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      onClick: () => markAsCorrect(index)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
      className: "mark-as-correct",
      icon: props.attributes.correctAnswer == index ? 'star-filled' : 'star-empty'
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      isLink: true,
      className: "attention-delete",
      onClick: () => deleteAnswer(index)
    }, "Delete")));
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isPrimary: true,
    onClick: () => {
      props.setAttributes({
        // Add another empty string to answers array
        answers: props.attributes.answers.concat([undefined])
      });
    }
  }, "Add another answer"));
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map