var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgres://localhost:5432/susi';
var db = pgp(connectionString);


module.exports = {
    getAllSusi: getAllSusi,
    getSingleSusi: getSingleSusi
};

function getAllSusi(req, res, next) {
    // db.any('select * from susi_flow_detail')
    db.any('select division, region, auth_method, sum(f_login_attempt) as tot_login_attempt, ' +
        'sum(f_login_succ) as tot_login_succ, sum(f_acct_verify) as tot_acct_verify, ' +
        'sum(f_personalize_wifi) as tot_personalize_wifi, sum(f_personalize_wifi_succ) ' +
        'as tot_personalize_wifi_succ from public.susi_flow_detail group by division,region,auth_method')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL susi'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function getSingleSusi(req, res, next) {
    db.one('select division, region, auth_method, sum(f_login_attempt) as ' +
        'tot_login_attempt, sum(case when p=1 then f_login_succ else 0 end) as ' +
        'tot_login_succ, sum(case when p=1 then f_acct_verify else 0 end) as tot_acct_verify, ' +
        'sum(case when p=1 then f_personalize_wifi else 0 end)  as tot_personalize_wifi, ' +
        'sum(case when p=1 then f_personalize_wifi_succ else 0 end) as tot_personalize_wifi_succ from ' +
        '( select division, region, auth_method, f_login_attempt, f_login_succ, f_acct_verify, ' +
        'f_personalize_wifi, f_personalize_wifi_succ, rank() over (partition by user_ip, day_id ' +
        'order by f_personalize_wifi_succ DESC, f_personalize_wifi DESC, f_acct_verify DESC, ' +
        'f_login_succ DESC, f_login_attempt DESC, auth_attempt_cnt DESC) as r, rank() over ' +
        '(partition by account_id, day_id order by f_personalize_wifi_succ DESC, ' +
        'f_personalize_wifi DESC, f_acct_verify DESC, f_login_succ DESC, f_login_attempt DESC, ' +
        'auth_attempt_cnt DESC, acctid_authed_cnt DESC) as p from susi_flow_detail ) ' +
        'a where r=1 group by division, region, auth_method ')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: '*'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}



function getAllSusiByDate(req, res, next) {
    var date = {};

    db.any('select division, region, auth_method, sum(f_login_attempt) as tot_login_attempt, ' +
        'sum(f_login_succ) as tot_login_succ, sum(f_acct_verify) as tot_acct_verify, ' +
        'sum(f_personalize_wifi) as tot_personalize_wifi, sum(f_personalize_wifi_succ) ' +
        'as tot_personalize_wifi_succ from public.susi_flow_detail group by division,region,auth_method')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL susi'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
