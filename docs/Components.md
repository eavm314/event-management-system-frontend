# Documentación de los componentes

## CheckButton

### Propiedades

- `id` (string): Identificador único.
- `value` (string): Valor asociado a la caja de verificación.
- `textCheckBox` (string): Etiqueta de la caja de verificación.

### Funcionalidad

Caja de verificación que permite hacer clic en la etiqueta para activar la caja de verificación.

## PrimaryButton

### Propiedades

- `textButton` (string): Texto que se muestra en el botón.
- `actionButton` (opcional, función): Función que se ejecuta cuando se hace clic en el botón.

### Funcionalidad

Botón principal de la aplicación

## EditableImage

### Propiedades

- `urlImg` (string | StaticImageData): URL o datos de imagen estática.
- `imageTitle` (string): Texto alternativo para la imagen.
- `width` (opcional, number): Ancho de la imagen.
- `height` (opcional, number): Altura de la imagen.

### Funcionalidad

Renderiza una imagen editable con el texto alternativo proporcionado.

Este componente React utiliza la librería `next/image` para mostrar imágenes editables.

## InfoImage Componente

### Propiedades

- `children` (ReactNode): Contenido del componente.
- `urlImage` (string | StaticImageData): URL o datos de imagen estática.
- `imageTitle` (string): Texto alternativo para la imagen.
- `reverse` (opcional, boolean): Si se debe invertir el orden de la disposición del contenido e imagen.

### Funcionalidad

Renderiza un componente de información con una imagen a la derecha o la izquierda.

## InteractiveSectionPrimaryForm Componente

### Propiedades

- `checkButtonId` (string): Identificador para el botón de verificación.
- `checkButtonText` (string): Texto de la casilla de verificación.
- `textButton` (string): Texto para el botón primario.
- `actionButton` (función): Función que se ejecuta al hacer clic en el botón primario.
- `questionText` (string): Texto de la pregunta para el enlace.
- `textLink` (string): Texto para el enlace.
- `actionLink` (función): Función que se ejecuta al hacer clic en el enlace.
- `existCheckBox` (boolean): Indica si debe mostrarse la casilla de verificación.
- `existLink` (boolean): Indica si debe mostrarse el enlace.

### Funcionalidad

Campo que tiene componentes de formulario, sin necesariamente contener preguntas.

## LinkRedirector Componente

### Propiedades

- `questionText` (string): Texto de la pregunta o mensaje.
- `textLink` (string): Texto del enlace.
- `action` (función): Función que se ejecuta al hacer clic en el enlace.

### Funcionalidad

Este componente React crea un texto con un enlace interactivo para realizar alguna accion.

## Documentación de PrincipalModelForm Component

### Descripción

El componente `PrincipalModelForm` es una parte de una aplicación React que se utiliza para crear formularios interactivos con preguntas y opciones seleccionables. Proporciona una estructura general para construir formularios personalizados con una variedad de características.

### Props

El componente acepta las siguientes propiedades (props):

- `formTitle` (string): Define el título del formulario.
- `listOfQuestions` (array de QuestionForm): Una lista de preguntas que se muestran en el formulario.
- `checkButtonId` (string, opcional): El ID del botón de verificación (checkbox) si existe.
- `checkButtonText` (string, opcional): El texto del botón de verificación (checkbox) si existe.
- `buttonText` (string): El texto del botón principal del formulario.
- `actionButton` (función): La función que se ejecuta al hacer clic en el botón principal.
- `textLeft` (string, opcional): Texto opcional que se muestra en el lado izquierdo del formulario.
- `textRight` (string, opcional): Texto opcional que se muestra en el lado derecho del formulario.
- `textLink` (string, opcional): Texto para un enlace opcional.
- `actionLink` (función, opcional): La función que se ejecuta al hacer clic en el enlace opcional.
- `existSelectQuestion` (boolean): Indica si existen preguntas con opciones seleccionables en el formulario.
- `existCheckBox` (boolean): Indica si existe un checkbox en el formulario.
- `existLink` (boolean): Indica si existe un enlace opcional en el formulario.
- `optionsSelect` (array de SelectOption, opcional): Una lista de opciones seleccionables si existen.

### Uso

El componente `PrincipalModelForm` se utiliza para crear formularios personalizados en una aplicación React. Los desarrolladores pueden proporcionar las propiedades necesarias para configurar el formulario según sus requisitos específicos.

### Ejemplo de Uso

```jsx
<PrincipalModelForm
  formTitle="Formulario de Ejemplo"
  listOfQuestions={preguntas}
  buttonText="Enviar"
  actionButton={handleSubmit}
  existSelectQuestion={true}
  existCheckBox={false}
/>
```

## Documentación de Question Component

### Descripción

El componente `Question` es una parte de una aplicación React que se utiliza para renderizar diferentes tipos de campos de entrada en un formulario de preguntas. Este componente puede generar campos de entrada normales, campos de entrada de texto largo (textarea) y campos de selección (select).

### Props

El componente acepta las siguientes propiedades (props):

- `id` (string): Un identificador único para el campo de entrada.
- `placeHolder` (string): El texto de marcador de posición que se muestra en el campo de entrada.
- `register` (UseFormRegister): Una función proporcionada por React Hook Form para registrar el campo de entrada en el formulario.
- `typeQuestion` (string): El tipo de campo de entrada, por ejemplo, "text" o "number".
- `validatorFunction` (función): Una función que valida el valor del campo de entrada según criterios específicos.
- `maxLengthInput` (number): La longitud máxima permitida para el valor del campo de entrada.
- `minLengthInput` (number): La longitud mínima permitida para el valor del campo de entrada.
- `typeInput` (string): El tipo de campo de entrada a renderizar ("normal", "textarea" o "select").
- `selectOptionsList` (array de SelectOption, opcional): Una lista de opciones de selección si el campo de entrada es de tipo "select".

### Uso

El componente `Question` se utiliza para renderizar campos de entrada personalizados en un formulario. Los desarrolladores pueden proporcionar las propiedades necesarias para configurar el campo de entrada según sus requisitos específicos.

### Ejemplo de Uso

```jsx
<Question
  id="nombre"
  placeHolder="Escribe tu nombre"
  register={register}
  typeQuestion="text"
  validatorFunction={(value) => value.trim() !== ""}
  maxLengthInput={50}
  minLengthInput={2}
  typeInput="normal"
/>
```

## Documentación de QuestionList Component

### Descripción

El componente `QuestionList` es una parte de una aplicación React que se utiliza para representar una lista de preguntas en un formulario. Este componente recibe una lista de objetos de pregunta y renderiza campos de entrada personalizados utilizando el componente `Question`. Además, permite la inclusión de un componente de selección de preguntas (`QuestionSelector`) si se requiere.

### Props

El componente `QuestionList` acepta las siguientes propiedades (props):

- `listOfQuestions` (array de QuestionForm): Una lista de objetos de pregunta que se representarán en el formulario.
- `register` (UseFormRegister): Una función proporcionada por React Hook Form para registrar los campos de entrada en el formulario.
- `existSelectQuestion` (boolean): Indica si se debe incluir un componente de selección de preguntas.
- `optionsSelect` (array de SelectOption, opcional): Una lista de opciones de selección si se incluye un componente de selección de preguntas.

### Uso

El componente `QuestionList` se utiliza para representar una serie de campos de entrada personalizados en un formulario. Los desarrolladores pueden proporcionar una lista de preguntas y las propiedades necesarias para configurar estos campos según sus requisitos específicos. También permite la inclusión de un componente de selección de preguntas si es necesario.

### Ejemplo de Uso

```jsx
<QuestionList
  listOfQuestions={preguntas}
  register={register}
  existSelectQuestion={true}
  optionsSelect={opcionesDeSeleccion}
/>
```

## Documentación de QuestionSelector Component

### Descripción

El componente `QuestionSelector` es una parte de una aplicación React que se utiliza para representar un campo de selección (dropdown) en un formulario. Este componente recibe una lista de opciones de selección y permite a los usuarios elegir una de las opciones disponibles.

### Props

El componente `QuestionSelector` acepta las siguientes propiedades (props):

- `optionsSelect` (array de SelectOption, opcional): Una lista de opciones de selección que se mostrarán en el campo de selección.

### Uso

El componente `QuestionSelector` se utiliza para representar un campo de selección de opciones en un formulario. Los desarrolladores pueden proporcionar una lista de opciones de selección y configurar el componente según sus requisitos específicos.

### Ejemplo de Uso

```jsx
<QuestionSelector optionsSelect={opcionesDeSeleccion} />
```
