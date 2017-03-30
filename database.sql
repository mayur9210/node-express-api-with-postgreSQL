DROP DATABASE IF EXISTS susi;
CREATE DATABASE susi;

\c susi;

CREATE TABLE susi_flow_detail (
    tracking_id varchar(40) not null,
    user_ip varchar(40) not null,
    auth_attempt_cnt smallint,
    acctid_authed_cnt smallint,
    auth_method varchar(60),
    account_id varchar(20),
    division varchar(20),
    region varchar(28),
    f_login_attempt smallint,
    f_login_succ smallint,
    f_acct_verify smallint,
    f_personalize_wifi smallint,
    f_personalize_wifi_succ smallint,
    day_id smallint,
    PRIMARY KEY (day_id, tracking_id)
);


INSERT INTO susi_flow_detail (tracking_id, user_ip, auth_attempt_cnt, acctid_authed_cnt, auth_method, account_id, division, region, f_login_attempt,
            f_login_succ, f_acct_verify, f_personalize_wifi, f_personalize_wifi_succ, day_id)
VALUES ('002ab350-95de-478e-9205-57959daa3d5e', '76.22.255.49', 1, 1, 'account_selection_by_signin',
        8396510763789883, 'CENTRAL DIVISION', 'BIG SOUTH REGION', 1, 1, 1, 1, 1, 2017-01-05);

SELECT * FROM susi_flow_detail;
