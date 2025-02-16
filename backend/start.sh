#!/bin/sh

# Create config file
cat <<EOF > ../frontend/dist/frontend/assets/config.json
{
  "backendUrl": "${BACKEND_URL:-http://localhost:3000/api}"
}
EOF

echo "Set backend URL to ${BACKEND_URL:-http://localhost:3000/api}"

npm start
