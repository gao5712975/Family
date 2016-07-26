var async = require('async');
/**
 *
 * @param page
 * @param pageSize
 * @param Model
 * @param options populate,queryParams,sortParams
 * @param callback
 */
exports.page = function (page, pageSize, Model, options, callback) {
    var populate = options.populate || '';
    var queryParams = options.queryParams || {};
    var sortParams = options.sortParams || {};
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {  // 查询数量
            Model.count(queryParams).exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {   // 查询一页的记录
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                done(err, doc);
            });
        }
    }, function (err, results) {
        var count = results.count;
        $page.pageCount = (count - 1) / pageSize + 1;
        $page.results = results.records;
        callback(err, $page);
    });
};