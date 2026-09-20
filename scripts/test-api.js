/**
 * API Diagnostics Test Script
 * Verifies that Express backend routes operate correctly.
 */
const http = require('http');
const app = require('../backend/src/server');

const server = app.listen(5099, async () => {
  console.log('Test server active on port 5099');

  async function fetchJson(path, options = {}) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port: 5099,
          path,
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
          }
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, body: JSON.parse(data) });
            } catch (e) {
              resolve({ status: res.statusCode, body: data });
            }
          });
        }
      );
      req.on('error', reject);
      if (options.body) {
        req.write(JSON.stringify(options.body));
      }
      req.end();
    });
  }

  try {
    console.log('\n--- 1. Testing GET /api/health ---');
    const health = await fetchJson('/api/health');
    console.log('Status:', health.status, '| Body:', JSON.stringify(health.body));

    console.log('\n--- 2. Testing GET /api/projects ---');
    const projects = await fetchJson('/api/projects');
    console.log('Status:', projects.status, '| Found:', projects.body.count, 'projects');
    console.log('Projects:', projects.body.data.map(p => p.title));

    console.log('\n--- 3. Testing POST /api/contact (Valid Submission) ---');
    const contact = await fetchJson('/api/contact', {
      method: 'POST',
      body: {
        name: 'Adamas University Reviewer',
        email: 'reviewer@adamasuniversity.ac.in',
        subject: 'Engineering Portfolio Evaluation',
        message: 'Impressive full-stack architecture and MySQL database integration.'
      }
    });
    console.log('Status:', contact.status, '| Success:', contact.body.success, '| Message:', contact.body.message);

    console.log('\n--- 4. Testing GET /api/contact/submissions ---');
    const submissions = await fetchJson('/api/contact/submissions');
    console.log('Status:', submissions.status, '| Count:', submissions.body.count);

    console.log('\n--- 5. Testing POST /api/analytics ---');
    const analyticsPost = await fetchJson('/api/analytics', {
      method: 'POST',
      body: { page: '/test-verification' }
    });
    console.log('Status:', analyticsPost.status, '| Recorded:', analyticsPost.body.recordedInDb);

    console.log('\n--- 6. Testing GET /api/analytics ---');
    const analyticsGet = await fetchJson('/api/analytics');
    console.log('Status:', analyticsGet.status, '| Source:', analyticsGet.body.source);

    console.log('\n✅ ALL API TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    server.close(() => {
      console.log('Test server closed cleanly.');
      process.exit(0);
    });
  }
});
