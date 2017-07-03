var FIELDS = require("../dictionary");
/**
 * @module Recruits
 * @description  创建信息表
 * @param sequelize  Sequelize对象
 * @returns {*|{}}
 */
module.exports = function (sequelize) {
    return sequelize.define('Recruits', {
        /**
         * @see [recruitSfId](module-dictionary.html#.recruitSfId__anchor)
         */
        recruitSfId: FIELDS.recruitSfId,
        /**
         * @see [enterpriseName](module-dictionary.html#.enterpriseName__anchor)
         */
        enterpriseName: FIELDS.enterpriseName,
        /**
         * @see [startTime](module-dictionary.html#.startTime__anchor)
         */
        startTime: FIELDS.startTime,
        /**
         * @see [jobTitle](module-dictionary.html#.jobTitle__anchor)
         */
        jobTitle: FIELDS.jobTitle,
        /**
         * @see [salary](module-dictionary.html#.salary__anchor)
         */
        salary: FIELDS.salary,
        /**
         * @see [salaryMin](module-dictionary.html#.salaryMin__anchor)
         */
        salaryMin: FIELDS.salaryMin,
        /**
         * @see [salaryMax](module-dictionary.html#.salaryMax__anchor)
         */
        salaryMax: FIELDS.salaryMax,
        /**
         * @see [location](module-dictionary.html#.location__anchor)
         */
        location:FIELDS.location,
        /**
         *@see [jobDesc](module-dictionary.html#.jobDesc__anchor)
         */
        jobDesc:FIELDS.jobDesc,
        /**
          * @see [requireExp](module-dictionary.html#.requireExp__anchor)
          */
        requireExp: FIELDS.requireExp,
        /**
          * @see [languageType](module-dictionary.html#.languageType__anchor)
          */
        languageType: FIELDS.languageType
    });
};