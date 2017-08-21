var githubhook = require('githubhook');
var github = githubhook({ /* options */ });
var exec = require('child_process').exec;

github.listen();

github.on('*', function(event, repo, ref, data) {});

github.on('push', function(event, repo, ref, data) {
    console.log(data.pusher.name + ' just pushed to ' + data.repository.full_name);

    console.log('pulling code from GitHub...');

    // reset any changes that have been made locally
    exec('git -C ~/githook_handler reset --hard', execCallback);

    // and ditch any files that have been added locally too
    exec('git -C ~/githook_handler clean -df', execCallback);

    // now pull down the latest
    exec('git -C ~/githook_handler pull -f', execCallback);

    // and npm install with --production
    exec('npm -C ~/githook_handler install --production', execCallback);

    // and run tsc
    exec('tsc', execCallback);
});

github.on('event', function(repo, ref, data) {});

github.on('event:reponame', function(ref, data) {});

github.on('event:reponame:ref', function(data) {});

github.on('reponame', function(event, ref, data) {});

github.on('reponame:ref', function(event, data) {});

// GitLab system hooks
github.on('*', function(event, type, data) {});

github.on('type', function(event, data) {});

// if you'd like to programmatically stop listening
// github.stop();