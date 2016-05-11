/**
 * @file
 * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
 * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
 *             Github.js is freely distributable.
 */

import Requestable from './Requestable';

/**
 * Issue wraps the functionality to get issues for repositories
 */
class Issue extends Requestable {
   /**
    * Create a new Issue
    * @param {string} repository - the full name of the repository (`:user/:repo`) to get issues for
    * @param {Requestable.auth} [auth] - information required to authenticate to Github
    * @param {string} [apiBase=https://api.github.com] - the base Github API URL
    */
   constructor(repository, auth, apiBase) {
      super(auth, apiBase);
      this.__repository = repository;
   }

   /**
    * Create a new issue
    * @see https://developer.github.com/v3/issues/#create-an-issue
    * @param {Object} issueData - the issue to create
    * @param {Requestable.callback} [cb] - will receive the created issue
    * @return {Promise} - the promise for the http request
    */
   createIssue(issueData, cb) {
      return this._request('POST', `/repos/${this.__repository}/issues`, issueData, cb);
   }

   /**
    * List the issues for the repository
    * @see https://developer.github.com/v3/issues/#list-issues-for-a-repository
    * @param {Object} options - filtering options
    * @param {Requestable.callback} [cb] - will receive the array of issues
    * @return {Promise} - the promise for the http request
    */
   listIssues(options, cb) {
      return this._requestAllPages(`/repos/${this.__repository}/issues`, options, cb);
   }

   /**
    * List comments on an issue
    * @see https://developer.github.com/v3/issues/comments/#list-comments-on-an-issue
    * @param {number} issue - the id of the issue to get comments from
    * @param {Requestable.callback} [cb] - will receive the comments
    * @return {Promise} - the promise for the http request
    */
   listIssueComments(issue, cb) {
      return this._request('GET', `/repos/${this.__repository}/issues/${issue}/comments`, null, cb); // jscs:ignore
   }

   /**
    * Get a single comment on an issue
    * @see https://developer.github.com/v3/issues/comments/#get-a-single-comment
    * @param {number} id - the comment id to get
    * @param {Requestable.callback} [cb] - will receive the comment
    * @return {Promise} - the promise for the http request
    */
   getIssueComment(id, cb) {
      return this._request('GET', `/repos/${this.__repository}/issues/comments/${id}`, null, cb); // jscs:ignore
   }

   /**
    * Comment on an issue
    * @see https://developer.github.com/v3/issues/comments/#create-a-comment
    * @param {number} issue - the id of the issue to comment on
    * @param {string} comment - the comment to add
    * @param {Requestable.callback} [cb] - will receive the created comment
    * @return {Promise} - the promise for the http request
    */
   createIssueComment(issue, comment, cb) {
      return this._request('POST', `/repos/${this.__repository}/issues/${issue}/comments`, {body: comment}, cb); // jscs:ignore
   }

   /**
    * Edit a comment on an issue
    * @see https://developer.github.com/v3/issues/comments/#edit-a-comment
    * @param {number} id - the comment id to edit
    * @param {string} comment - the comment to edit
    * @param {Requestable.callback} [cb] - will receive the edited comment
    * @return {Promise} - the promise for the http request
    */
   editIssueComment(id, comment, cb) {
      return this._request('PATCH', `/repos/${this.__repository}/issues/comments/${id}`, {body: comment}, cb); // jscs:ignore
   }

   /**
    * Delete a comment on an issue
    * @see https://developer.github.com/v3/issues/comments/#delete-a-comment
    * @param {number} id - the comment id to delete
    * @param {Requestable.callback} [cb] - will receive true if the request is successful
    * @return {Promise} - the promise for the http request
    */
   deleteIssueComment(id, cb) {
      return this._request('DELETE', `/repos/${this.__repository}/issues/comments/${id}`, null, cb); // jscs:ignore
   }

   /**
    * Edit an issue
    * @see https://developer.github.com/v3/issues/#edit-an-issue
    * @param {number} issue - the issue number to edit
    * @param {Object} issueData - the new issue data
    * @param {Requestable.callback} [cb] - will receive the modified issue
    * @return {Promise} - the promise for the http request
    */
   editIssue(issue, issueData, cb) {
      return this._request('PATCH', `/repos/${this.__repository}/issues/${issue}`, issueData, cb);
   }

   /**
    * Get a particular issue
    * @see https://developer.github.com/v3/issues/#get-a-single-issue
    * @param {number} issue - the issue number to fetch
    * @param {Requestable.callback} [cb] - will receive the issue
    * @return {Promise} - the promise for the http request
    */
   getIssue(issue, cb) {
      return this._request('GET', `/repos/${this.__repository}/issues/${issue}`, null, cb);
   }
}

module.exports = Issue;