packer {
  required_plugins {
    googlecompute = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

variable "project_id" {
  type      = string
  sensitive = true
}

variable "zone" {
  type      = string
  sensitive = true
}

variable "image_family" {
  type    = string
  default = "centos-stream-8"
}

variable "image_name" {
  type    = string
  default = "centos-stream-8"
}

variable "ssh_username" {
  type    = string
  default = "root"
}

variable "image_storage_locations" {
  type    = list(string)
  default = ["us-east1"]
}


source "googlecompute" "centos" {
  project_id   = var.project_id
  zone         = var.zone
  image_family = var.image_family
  # account_file = var.account_file
  ssh_username            = var.ssh_username
  image_name              = var.image_name
  image_storage_locations = var.image_storage_locations
}

build {
  sources = ["source.googlecompute.centos"]
  provisioner "shell" {
    script = "scripts/install.sh"
  }
  # copy the file to the instance before running the script through github actions
  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp.zip"
    destination = "/tmp/packer/webapp.zip"
  }

  # After copy the file, run the script
  provisioner "shell" {
    script = "scripts/postprocess.sh"
  }
}
