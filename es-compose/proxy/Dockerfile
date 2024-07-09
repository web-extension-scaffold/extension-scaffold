FROM httpd:2.4

# If conf.d isn't already being imported (in httpd:2.4 it is not) then import it in the httpd.conf
RUN grep -qxF 'IncludeOptional conf.d/*.conf' /etc/httpd/conf/httpd.conf || \
    echo 'IncludeOptional conf.d/*.conf' >> /etc/httpd/conf/httpd.conf