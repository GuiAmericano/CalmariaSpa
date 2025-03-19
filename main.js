let ultimoElementoFocado;


function gerenciarFocoModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const elementosModal = modal.querySelectorAll(
        "a, button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const primeiroElemento = elementosModal[0];
    const ultimoElemento = elementosModal[elementosModal.length - 1];

    primeiroElemento.focus();

    modal.addEventListener("keydown", (event) => {
        if(event.key === "Tab") {
            if(event.shiftKey) {
                //se a tecla shift + tab for pressionada e o foco estiver no primeiro elemento, mover o foco para o ultimo elemento
                if(document.activeElement === primeiroElemento) {
                    event.preventDefault();
                    ultimoElemento.focus();
                }
            } else {
                //se a tecla tab for pressionada e o foco estiver no ultimo elemento, mover o foco para o primeiro elemento
                if(document.activeElement === ultimoElemento || modal.contains(document.activeElement)) {
                    event.preventDefault();
                    primeiroElemento.focus();
                }
            }
        }
    });
}




function limparCampoModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const campos = modal.querySelectorAll("input, textarea");

    campos.forEach(campo => {
        if (campo.type === "radio" || campo.type === "checkbox") {
            campo.checked = false; // desmarcar radio ou checkbox
        } else {
            campo.value = ""; // limpar o valor dos outros campos
        }
    });
}



function alternarModal(modalId, abrir) {
    const modal = document.querySelector(`#${modalId}`);

    if (abrir) {
        ultimoElementoFocado = document.activeElement;

        modal.style.display = "block";
        gerenciarFocoModal(modalId);
        limparCampoModal(modalId);
    } else {
        modal.style.display = "none";
        
        if(ultimoElementoFocado) {
            ultimoElementoFocado.focus();
        }
    }

    document.body.style.overflow = abrir ? "hidden" : "auto";
    
}

//quando apertar o esc fecha o modal
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        alternarModal('ver-modal-inscrito', false);
        alternarModal('ver-modal-contato', false);
        alternarModal('ver-modal-enviado', false);
        //quando apertar o esc fecha o menu
        document.querySelectorAll('.cabecalho__lista-item').forEach((item) => {
            alternarSubmenu(item, false);
        });
    }
});




function alternarSubmenu(item, mostrar) {
  const submenu = item.querySelector(".submenu");

  if (submenu) {
    submenu.style.display = mostrar ? "block" : "none";

    const menuItem = item.querySelector(".cabecalho__lista-item a");
    menuItem.setAttribute("aria-expanded", mostrar ? true : false);

    const DropdownExpandedIcon = item.querySelector(
      ".material-symbols-outlined.icone"
    );

    DropdownExpandedIcon.classList.toggle("active", mostrar);
  }
}
//selecionar todos os cabecalho__lista-item (li)
document.querySelectorAll(".cabecalho__lista-item").forEach(item => {
    //adicionar um ouvinte mouseover (passar mouse em cima)
    item.addEventListener("mouseover", () => alternarSubmenu(item, true));

    //adicionar um ouvinte mouseout (tirar mouse de cima)
    item.addEventListener("mouseout", () => alternarSubmenu(item, false));

    //adicionar event de click
    item.addEventListener("click", () => {
        const submenu = item.querySelector(".submenu");

        const isDisplayed = submenu.style.display === "block";

        alternarSubmenu(item, !isDisplayed);
    })

});

//acordion 
document.querySelectorAll(".botao-acordeao").forEach(button => {
    button.addEventListener("click", () => alternarAcordeao(button));
});  

function alternarAcordeao(button) {
    const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";
    
    document.querySelectorAll(".botao-acordeao").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        const content = btn.nextElementSibling;
        content.classList.remove("expandido");
        content.setAttribute("aria-hidden", "true");
    });


    if (!isAlreadyOpen) {
        button.setAttribute("aria-expanded", "true");
        const content = button.nextElementSibling;
        content.classList.add("expandido");
        content.setAttribute("aria-hidden", "false");
    };
};
