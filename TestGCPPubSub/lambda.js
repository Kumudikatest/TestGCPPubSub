let AWS = require('aws-sdk');
let _auth = require('./Authorizer');
let google = require('googleapis').google;
const pubsub = google.pubsub('v1');
exports.handler = function (event, context, callback) {

	pubsub.projects.topics.publish({
		topic: `projects/${process.env.GCLOUD_PROJECT_ID}/topics/SigmaOutgoingMessage`,
		resource: {
			messages: [{ data: `SGVsbG8gV29ybGQ=`, attributes: {} }]
		}
	})
		.then(response => {
			console.log(response.data);           // successful response
			/*
			response.data = {
				"messageIds": [
					"<numeric-message-id>"
				]
			}
			*/
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
		});

	callback(null, 'Successfully executed');
}