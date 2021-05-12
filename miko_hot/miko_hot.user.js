// ==UserScript==
// @name         한여름의 소녀들 (R-18)
// @namespace    miko_superhot_v3
// @version      2.1.8
// @description  마이와 이치히메, 지니아가 수영복을 모두 탈의합니다.
// @author       ㅇㅇ
// @license      MIT
// @icon         https://majaksin.github.io/miko_hot/preview.png
// @supportURL   https://github.com/majaksin/miko_hot/issues
// @homepageURL  https://github.com/majaksin/miko_hot
// @downloadURL  https://majaksin.github.io/miko_hot/miko_hot.user.js
// @updateURL    https://majaksin.github.io/miko_hot/miko_hot.user.js
// @include      https://game.mahjongsoul.com/*
// @grant        unsafeWindow
// @grant        GM_getResourceText
// @run-at       document-start
// @resource resourcepack https://majaksin.github.io/miko_hot_v3/resourcepack.json
// ==/UserScript==

(function () {
    'use strict';
    const GAME_BASE_URL = 'https://game.mahjongsoul.com/';
    const RES_BASE_URL = 'https://majaksin.github.io/miko_hot_v3/';

    const version_re = /v\d+\.\d+\.\d+\.w\//i;
    const resourcepack = JSON.parse(GM_getResourceText('resourcepack'));


    replaceXhrOpen();

    function updateUrl(url) {
        const original_url = url;
        if (url.startsWith(GAME_BASE_URL)) {
            url = url.substring(GAME_BASE_URL.length);
        }
        url = url.replace(version_re, '');
        if (resourcepack.replace.includes(url)) {
            url = RES_BASE_URL + 'assets/' + url;
            console.log(url);
            return url;
        } else {
            return original_url;
        }
    }

    function replaceXhrOpen() {
        const original_function = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            return original_function.call(this, method, updateUrl(url), async, user, password);
        };
    }

})();
