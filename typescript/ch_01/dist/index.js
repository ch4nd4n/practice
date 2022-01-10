"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// eslint-disable-next-line no-console
console.log('hello');
const postsDirectory = '/Users/chandan/code/personal/chandankumar.com/current/minimal-blog/content/posts';
const postList = fs_1.default.readdirSync(postsDirectory);
console.log(postList);
