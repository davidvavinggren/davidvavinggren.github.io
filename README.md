# davidvavinggren.github.io

Built using the [academicpages Jekyll template](https://github.com/academicpages/academicpages.github.io).

installation steps:
- brew install rbenv ruby-build
- add eval "$(rbenv init - zsh)" to zshrc
- source ~/.zshrc
- rbenv install 3.2.2
- rbenv global 3.2.2
- which ruby     # ~/.rbenv/versions/3.2.2/bin/ruby (to verify)
- ruby -v        # ruby 3.2.2 (to verify)
- gem install bundler -v 2.4.22
- gem install jekyll
- bundle install
- bundle exec jekyll serve
- bundle exec jekyll serve --port 8888 # to set the port yourself
- visit: http://localhost:4000 to see the webpage
- you can get autorefresh with bundle exec jekyll serve --livereload

