//  Error handler to handler an error depending if it's an SQL error or JS error
function handle(e) {
    if (e.sql) {
        console.log(`[MySQL] ERROR: ${e.sqlMessage}\n[MySQL] QUERY: ${e.sql}`)
    } else {
        console.log(`Error: ${e}`)
    }
}

module.exports = {
    handle
}