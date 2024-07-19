FROM httpd:2.4.61-bookworm

# Allow conf files in conf.d to be recognized
RUN echo "IncludeOptional conf/conf.d/*.conf" >> /usr/local/apache2/conf/httpd.conf

# Add ServerName to the Apache configuration
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Install curl and iproute2 (for docker bash commands)
RUN apt-get update && \
    apt-get install -y curl iproute2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*