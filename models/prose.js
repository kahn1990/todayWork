var express                               = require('express')
  , mysql                                 = require('mysql')
  , http                                  = require('http');
var queryDb                               = require('../db');
mysql                                     = queryDb.getMysqlConn();
var mysqlString                           = require('./api/sql');
var object                                = require('./api/object');
var app                                   = express();
/**
 * �����û� ID ���� �����ձ���Ϣ
 * @param userid
 * @param callback
 */
exports.getDatenoteById                   = function (userid, callback) {
  var sql = mysqlString.rb_datenote.getDatenoteById(userid);
  object.queryMysql(sql, callback);
};
/**
 * �����û� ID �� �� ID �����û���Ϣ
 * @param userId
 * @param userGroupId
 * @param callback
 */
exports.getDatenoteByIdAndGroupId         = function (userId, userGroupId, callback) {
  var sql = mysqlString.rb_datenote.getDatenoteByIdAndGroupId(userId, userGroupId);
  object.queryMysql(sql, callback);
};
/**
 * ���������ַ�����ѯ�ձ���Ϣ
 * @param userid
 * @param dataString
 * @param callback
 */
exports.getNoteDateByDataString           = function (userid, dataString, callback) {
  var sql = mysqlString.rb_datenote.getNoteDateByDataString(userid, dataString);
  object.queryMysql(sql, callback);
};
/**
 * �������������ж��Ƿ�����ձ�
 * @param userid
 * @param dataString
 * @param groupid
 * @param callback
 */
exports.cheackNoteByDataGroupId           = function (userid, dataString, groupid, callback) {
  var sql = mysqlString.rb_datenote.cheackNoteByDataGroupId(userid, dataString, groupid);
  object.queryMysql(sql, callback);
};
/**
 * �����ձ�����
 * @param userid
 * @param content
 * @param callback
 */
exports.postProseById                     = function (userid, content, callback) {
  var sql = mysqlString.rb_datenote.postProseById(userid, content);
  object.queryMysql(sql, callback);
};
/**
 * ������������˵Ŀհ��ձ�ģ��
 * @param sqlInsterString
 * @param callback
 */
exports.insterAllByUser                   = function (sqlInsterString, callback) {
  object.queryMysql(sqlInsterString, callback);
};
/**
 * �����ձ�
 * @param id
 * @param proseTitle
 * @param proseDateOld
 * @param proseDate
 * @param proseContent
 * @param groupId
 * @param callback
 */
exports.addProse                          = function (id, proseTitle, proseDateOld, proseDate, proseContent, groupId, callback) {
  var sql = mysqlString.rb_datenote.postAddProse(id, proseTitle, proseDateOld, proseDate, proseContent, groupId);
  object.queryMysql(sql, callback);
};
/**
 * �鿴�����˵��ձ�
 * @param err
 * @param callback
 */
exports.allUserForProse                   = function (err, callback) {
  var sql = mysqlString.rb_datenote.allUserForProse(null);
  object.queryMysql(sql, callback);
};
/**
 * �������в���
 * @param err
 * @param callback
 */
exports.queryAllDepartment                = function (err, callback) {
  var sql = mysqlString.rb_department.queryAllDepartment(null);
  object.queryMysql(sql, callback);
};
/**
 * ������ ID ��ѯ�����ձ�
 * @param group_id
 * @param callback
 */
exports.queryAllDatenoteByGroup_id        = function (group_id, callback) {
  var sql = mysqlString.rb_datenote.queryAllDatenoteByGroup_id(group_id);
  object.queryMysql(sql, callback);
};
/**
 * ������ ID����ʼʱ�䡢����ʱ�������ձ�
 * @param group_id
 * @param startTime
 * @param endTime
 * @param callback
 */
exports.queryAllDatenoteByGroup_idAndDate = function (group_id, startTime, endTime, callback) {
  var sql = mysqlString.rb_datenote.queryAllDatenoteByGroup_idAndDate(group_id, startTime, endTime);
  object.queryMysql(sql, callback);
};
/**
 * ������ ID���û� ID��ʱ������ձ�
 * @param group_id
 * @param user_id
 * @param dateTime
 * @param callback
 */
exports.interByGroupidAndUserIdAndTime    = function (group_id, user_id, dateTime, callback) {
  var sql = mysqlString.rb_datenote.interByGroupidAndUserIdAndTime(group_id, user_id, dateTime);
  object.queryMysql(sql, callback);
};
/**
 * �鿴�Ƿ�����ձ�
 * @param userIdCache
 * @param groupId
 * @param proseDateFormat
 * @param callback
 */
exports.getDatenoteByIdAndGroupIdAndTime  = function (userIdCache,
                                                      groupId,
                                                      proseDateFormat,
                                                      callback) {
  var sql = "select * from rb_user u, rb_datenote dn,rb_group g where " +
    "dn.rb_group_id = g.rb_group_id " +
    "and u.rb_user_id = dn.rb_datenote_user_id " +
    "and dn.rb_group_id='" + groupId + "' " +
    "and u.rb_user_idcache='" + userIdCache + "' " +
    "and FROM_UNIXTIME(floor(dn.rb_datenote_date/1000), '%Y-%m-%d') ='" + proseDateFormat + "'";
  object.queryMysql(sql, callback);
};
/**
 * �����ձ�
 * @param userId
 * @param proseTitle
 * @param proseDateString
 * @param proseContent
 * @param groupId
 * @param callback
 */
exports.interDatenoteInfo                 = function (userId,
                                                      proseTitle,
                                                      proseDateString,
                                                      proseContent,
                                                      groupId,
                                                      callback) {
  proseTitle   = proseTitle || "ûд�ձ�����r(�s���t)�q";
  proseContent = proseContent || "";
  var sql      = 'INSERT INTO `rb_datenote` (' +
    '`rb_datenote_id`,' +
    '`rb_datenote_user_id`,' +
    '`rb_datenote_date`, ' +
    '`rb_datenote_title`, ' +
    '`rb_datenote_content`, ' +
    '`rb_group_id`) VALUES (' +
    'NULL, ' +
    '"' + userId + '", ' +
    '"' + proseDateString + '", ' +
    '"' + proseTitle + '", ' +
    '"' + proseContent + '", ' +
    '"' + groupId + '")';
  object.queryMysql(sql, callback);
};
/**
 * �����ձ�
 * @param id
 * @param proseTitle
 * @param proseDate
 * @param proseContent
 * @param groupId
 * @param callback
 */
exports.addProse                          = function (id,
                                                      proseTitle,
                                                      proseDateFormat,
                                                      proseDate,
                                                      proseContent,
                                                      groupId,
                                                      callback) {
  var sql = "UPDATE `daily_report`.`rb_datenote` SET " +
    "`rb_datenote_title` = '" + proseTitle + "'," +
    "`rb_datenote_date` = '" + proseDate + "'," +
    "`rb_datenote_content` = '" + proseContent + "'" +
    " WHERE " +
    "FROM_UNIXTIME(floor(`rb_datenote`.`rb_datenote_date`/1000), '%Y-%m-%d') ='" + proseDateFormat + "' " +
    "and `rb_datenote`.`rb_datenote_user_id` =  '" + id + "' " +
    "and `rb_datenote`.`rb_group_id` = '" + groupId + "';";

  object.queryMysql(sql, callback);
};