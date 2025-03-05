---
layout: default
---

# Note pentru Titularizare la Istorie

Bun venit la colecția mea de note pentru examenul de titularizare la istorie!

## Cuprins

{% for page in site.pages %}
{% if page.name != "index.md" and page.name != "404.md" and page.name != "README.md" %}
- [{{ page.name | replace: ".md", "" }}]({{ page.url | relative_url }})
{% endif %}
{% endfor %}
