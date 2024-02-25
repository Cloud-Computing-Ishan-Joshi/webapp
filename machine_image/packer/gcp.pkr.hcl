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
  default = "centos-stream-8-custom-image"
}

variable "ssh_username" {
  type    = string
  default = "centos"
}

variable "image_storage_locations" {
  type    = list(string)
  default = ["us-east1"]
}

variable "network" {
  type    = string
  default = "default"
}

# variable "account_file" {
#   type      = string
#   default   = "/home/ishanjoshi7i/Downloads/dev-1-415017-ab007b3e3a97.json"
# }

source "googlecompute" "centos" {
  project_id   = var.project_id
  zone         = var.zone
#   source_image_family = var.image_family
  # account_file = var.account_file
  ssh_username            = var.ssh_username
  image_name              = var.image_name
  network                = var.network
  image_storage_locations = var.image_storage_locations
  source_image = "centos-stream-8-v20240110"
  disk_size = 20
  machine_type = "n1-standard-1"

}

build {
  sources = ["source.googlecompute.centos"]
  # provisioner "shell" {
  #   # script = "/home/ishanjoshi7i/cloud-computing/hw5/webapp/machine_image/packer/scripts/envscript.sh"
  #   script = "/home/runner/work/webapp/webapp/machine_image/packer/scripts/envscript.sh"
  # }
  provisioner "shell" {
    # script = "/home/ishanjoshi7i/cloud-computing/hw5/webapp/machine_image/packer/scripts/install.sh"
    script = "/home/runner/work/webapp/webapp/machine_image/packer/scripts/install.sh"
  }

  # copy the file to the instance before running the script through github actions
  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp.zip"
    # source      = "/home/ishanjoshi7i/cloud/webapp.zip"
    # destination = "/tmp/packer/webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  # After copy the file, run the script
  provisioner "shell" {
    script = "/home/runner/work/webapp/webapp/machine_image/packer/scripts/postprocess.sh"
    # script = "/home/ishanjoshi7i/cloud-computing/hw5/webapp/machine_image/packer/scripts/postprocess.sh"
  }
}
