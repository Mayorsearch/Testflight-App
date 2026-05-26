# frozen_string_literal: true

# ==============================================================================
# iMediaSave — Gemfile
# Manages Ruby gem dependencies for Fastlane and its plugins.
# ==============================================================================

source 'https://rubygems.org'

gem 'fastlane', '~> 2.220'

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
