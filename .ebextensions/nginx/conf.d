location / {
            proxy_pass http://127.0.0.1:4200/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
        location /auth {
            proxy_pass http://127.0.0.1:8080/auth;

        }