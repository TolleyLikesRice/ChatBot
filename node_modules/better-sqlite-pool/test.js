"use strict";

const Pool = require("./").Pool;
const assert = require("assert");
const fs = require("fs");

var filename = "./example.db";

if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
}

var pool = new Pool("./example.db"),
    connection = null;

pool.acquire().then(con => {
    connection = con;

    var ddl = [
        "create table `users` (",
        "  `id` integer primary key autoincrement not null,",
        "  `name` varchar(32) not null,",
        "  `email` varchar(255)",
        ")"
    ].join("\n");

    con.exec(ddl);

    var res = con.prepare("insert into `users` (`name`, `email`) values (?, ?)")
        .run(["Ayon Lee", "i@hyurl.com"]);

    var res2 = con.prepare("select * from `users` where `id` =  ?").get(res.lastInsertROWID);

    assert.deepStrictEqual(res2, {
        id: res.lastInsertROWID,
        name: "Ayon Lee",
        email: "i@hyurl.com"
    });

    con.release();
}).catch(err => {
    console.log(err);
    process.exit(1);
});

setTimeout(() => {
    pool.acquire().then(con => {
        assert.equal(con, connection);
        pool.close();

        console.log("#### OK ####");
    });
}, 100);