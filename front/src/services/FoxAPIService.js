const SERVER_ADDRESS = `${window.location.origin}/`;

// const controller = new AbortController();
class FoxApiService {
  apiBase = `${SERVER_ADDRESS}api/`;

  async get(url, signal = null) {
    const jwt = localStorage.getItem("token");
    const res = await fetch(url, {
      // signal: controller.signal,
      signal: signal,
      headers: jwt
        ? {
            Authorization: `JWT ${jwt}`,
            Accept: "application/json",
          }
        : {
            Accept: "application/json",
          },
    });
    if (!res.ok) {
      if (res.status >= 500) {
        throw new Error(`Could not fetch ${url}. Received ${res.status}`);
      }
    }
    return res.json();
  }
  async getDoc(url, signal = null) {
    const jwt = localStorage.getItem("token");
    const res = await fetch(url, {
      signal: signal,
      headers: jwt
        ? {
            Authorization: `JWT ${jwt}`,
          }
        : {},
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}`);
    }
    return res;
  }

  async post(url, data = {}) {
    const jwt = localStorage.getItem("token");
    const csrftoken = this.getCookie("csrftoken");
    const res = await fetch(url, {
      method: "POST",
      headers: jwt
        ? {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          }
        : {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (!res.ok) {
      // throw new Error(`Could not fetch ${url}. Received ${res.status}`);
      const error = await res.json();
      throw error;
    }
    return res.json();
  }

  async postWithFiles(url, data = {}) {
    const jwt = localStorage.getItem("token");
    const csrftoken = this.getCookie("csrftoken");
    const res = await fetch(url, {
      method: "POST",
      headers: jwt
        ? {
            Authorization: `JWT ${jwt}`,
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          }
        : {
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          },
      body: data, // body data type must match "Content-Type" header
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}`);
    }
    return res.json();
  }

  async put(url, data = {}) {
    const jwt = localStorage.getItem("token");
    const csrftoken = this.getCookie("csrftoken");
    const res = await fetch(url, {
      method: "PUT",
      headers: jwt
        ? {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          }
        : {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (!res.ok) {
      if (res.status >= 500) {
        throw new Error(`Could not fetch ${url}. Received ${res.status}`);
      }
    }

    return res.json();
  }

  async patch(url, data = {}) {
    const jwt = localStorage.getItem("token");
    const csrftoken = this.getCookie("csrftoken");
    const res = await fetch(url, {
      method: "PATCH",
      headers: jwt
        ? {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          }
        : {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}`);
    }

    return res.json();
  }

  async patchWithFiles(url, data = {}) {
    const jwt = localStorage.getItem("token");
    const csrftoken = this.getCookie("csrftoken");
    const res = await fetch(url, {
      method: "PATCH",
      headers: jwt
        ? {
            // 'Content-Type': 'application/json',
            Authorization: `JWT ${jwt}`,
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          }
        : {
            // 'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          },
      body: data, // body data type must match "Content-Type" header
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}`);
    }

    return res.json();
  }

  async delete(url, data = {}) {
    const jwt = localStorage.getItem("token");
    const csrftoken = this.getCookie("csrftoken");
    const res = await fetch(url, {
      method: "DELETE",
      headers: jwt
        ? {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          }
        : {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken ? csrftoken : "",
            Accept: "application/json",
          },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Received ${res.status}`);
    }
    return Promise.resolve("Worker deleted successfully!");
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  getEntityList = async (entity, params, signal = null) => {
    let url = `${this.apiBase}${entity}/`;
    if (params) {
      url = new URL(url);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }
    const res = await this.get(url, signal);
    return res;
  };

  createEntityOf = (entity, data) => {
    let url = `${this.apiBase}${entity}/new/`;
    const res = this.post((url = url), (data = data));
    return res;
  };

  createEntityWithFile = (entity, data) => {
    let url = `${this.apiBase}${entity}/new/`;
    const res = this.postWithFiles((url = url), (data = data));
    return res;
  };

  getDetailsOf = (entity, id, signal = null) => {
    let url = `${this.apiBase}${entity}/${id}/`;
    const res = this.get((url = url), signal);
    return res;
  };

  updateEntityOf = (entity, id, data) => {
    let url = `${this.apiBase}${entity}/${id}/`;
    const res = this.put((url = url), (data = data));
    return res;
  };

  patchEntityOf = (entity, id, data) => {
    let url = `${this.apiBase}${entity}/${id}/`;
    const res = this.patch((url = url), (data = data));
    return res;
  };

  patchEntityWithFiles = (entity, id, data) => {
    let url = `${this.apiBase}${entity}/${id}/`;
    const res = this.patchWithFiles((url = url), (data = data));
    return res;
  };

  getCompanySafetyInfo = (company) => {
    let url = `${this.apiBase}safety_templates/${company}/`;
    const res = this.get((url = url));
    return res;
  };

  patchCompanySafetyInfo = (company, data) => {
    let url = `${this.apiBase}safety_templates/${company}/`;
    const res = this.patchWithFiles((url = url), (data = data));
    return res;
  };

  downloadDocument = async (id) => {
    let url = `${this.apiBase}documents/downloads/${id}/`;
    const res = await this.getDoc((url = url));
    return res.blob();
  };

  downloadFilledDocument = async (id) => {
    let url = `${this.apiBase}documents/downloads/filled/${id}/`;
    const res = await this.getDoc((url = url));
    return res.blob();
  };

  downloadSafetyTemplate = async (doctype) => {
    let url = `${this.apiBase}download_template/${doctype}/`;
    const res = await this.getDoc((url = url));
    return res.blob();
  };

  getDisplayPermission = async (id) => {
    let url = `${this.apiBase}documents/display/permission/${id}`;
    const res = await this.getDoc((url = url));
    return res;
  };

  downloadWorkerDocument = async (worker_id, doc_type) => {
    let url = `${this.apiBase}workers/download_doc/${worker_id}/${doc_type}/`;
    const res = await this.getDoc((url = url));
    return res.blob();
  };

  downloadWorkerCompetency = async (id) => {
    let url = `${this.apiBase}worker_special_competencies/downloads/${id}/`;
    const res = await this.getDoc((url = url));
    return res.blob();
  };

  getSignature = async (contractor_id) => {
    let url = `${this.apiBase}contractors/${contractor_id}/signature/`;
    const res = await this.getDoc((url = url));
    return res.blob();
  };

  getFileDownloadLink = (id) => {
    return `${this.apiBase}documents/downloads/${id}/`;
  };

  deleteEntityOf = async (entity, id, data = {}) => {
    let url = `${this.apiBase}${entity}/${id}/`;
    const res = await this.delete((url = url), (data = data));
    return res;
  };

  resetPassword = (data) => {
    let url = `${this.apiBase}password_reset/`;
    const res = this.post((url = url), (data = data));
    return res;
  };

  verifyPermit = (part1, part2, part3) => {
    let url = `${this.apiBase}permits/verification/${part1}/${part2}/${part3}/`;
    const res = this.get((url = url));
    return res;
  };

  connectContractorToCompany = (id, data) => {
    let url = `${this.apiBase}contractors/${id}/add_company/`;
    const res = this.patch((url = url), (data = data));
    return res;
  };
}

export default FoxApiService;
