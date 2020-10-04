module App

open Elmish

type Model =
    { Message: string }
    static member Empty = { Message = "Elmish React is working" }

type Msg =
    | NewMessage of string
    | ResetMessage

let init () = Model.Empty, Cmd.Empty

let update msg model =
    match msg with
    | NewMessage s -> { model with Message = s }, Cmd.Empty
    | ResetMessage -> Model.Empty, Cmd.Empty

open Fable.React.Props
open Fable.React.Helpers
open Fable.React.Standard
open Fable.Core.JsInterop
open Browser.Types

let view model dispatch =
    div [] [
        h2 [] [ str model.Message ]
        input [Type "text"
               Placeholder "Ready to edit" 
               Value model.Message
               OnChange (fun ev -> ev.target?value |> NewMessage |> dispatch)
              ]
    ]

open Elmish
open Elmish.React

Program.mkProgram init update view
|> Program.withReactBatched "elmishReact"
|> Program.run
