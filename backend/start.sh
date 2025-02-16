#!/bin/sh

# Create config file
cat <<EOF > /frontend/dist/assets/config.json
{
  "backendUrl": "${BACKEND_URL:-http://localhost:3000/api}"
}
EOF

npm start
