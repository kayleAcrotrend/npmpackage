module.exports = function program(aws, siteBucket) {
    const indexContent = `<html><head>
      <title>Hello S3</title><meta charset="UTF-8">
      </head>
      <body><p>Hello, world!</p><p>Made with ❤️ with <a href="https://pulumi.com">Pulumi</a></p>
      </body></html>
      `

    let object = new aws.s3.BucketObject('index', {
      bucket: siteBucket,
      content: indexContent,
      contentType: 'text/html; charset=utf-8',
      key: 'index.html'
    })


    let bucketPolicy = new aws.s3.BucketPolicy('bucketPolicy', {
      bucket: siteBucket.bucket,
      policy: {
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Principal: '*',
          Action: [ 's3:GetObject' ],
          Resource: [ `arn:aws:s3:::${siteBucket.name}/*` ]
        }]
      }
    })
}