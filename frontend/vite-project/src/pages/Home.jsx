import React, { useState, useEffect, useRef } from "react";
import {
  Keyboard,
  Mail,
  Menu,
  MessageCircle,
  User,
  UserPlus2Icon,
  X,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

// Components
import { motion, AnimatePresence } from "motion/react";

// shadcn UI components
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//Lucid
import {
  Award,
  Grid,
  FileText,
  Layers,
  Bookmark,
  ChevronDown,
  LayoutGrid,
  Search,
  AudioWaveform,
  BadgeCheck,
  Bell,
  PanelLeft,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Check,
  Wand2,
  Loader2,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  PlusCircle,
  Settings,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  Users,
  UserPlus,
  MessageSquare,
  Video,
} from "lucide-react";

// Animate-ui radix components
//Icons 
import {ArrowDown} from "@/components/animate-ui/icons/arrow-down"
import {ChevronUpDown} from "@/components/animate-ui/icons/chevron-up-down"

// Backgrounds
import { BubbleBackgroundDemo } from "../components/bubble-background";
import { GradientBackground } from "@/components/animate-ui/backgrounds/gradient";

//Buttons
import {
  InputButton,
  InputButtonAction,
  InputButtonProvider,
  InputButtonSubmit,
  InputButtonInput,
} from "@/components/animate-ui/buttons/input";

// text
import { GradientText } from "../components/animate-ui/text/gradient";
import { HighlightText } from "../components/animate-ui/text/highlight";

// Animations
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/animate-ui/radix/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/radix/accordion";
import{
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/animate-ui/base/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/animate-ui/radix/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/animate-ui/radix/tooltip";


function NavItem({ href, icon, children, active }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 p-2 m-1 text-lg  text-white hover:bg-gray-700 rounded-lg",
        active && "text-white bg-gray-700"
      )}>
      {icon}
      <span>{children}</span>
    </Link>
  );
}

/* function FolderItem({ href, children }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-lg">
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span>{children}</span>
    </Link>
  );
}

function FileCard({ title, metadata, thumbnail }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{metadata}</p>
      </div>
    </div>
  );
} */

("use client");

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const tags = [
  {
    value: "Trabalho",
    icon: "work",
    label: "Trabalho",
  },
  {
    value: "Familia",
    icon:"",
    label: "Familia",
  },
  {
    value: "Amigos",
    icon:"",
    label: "Amigos",
  },
  {
    value: "Esportes",
    icon:"",
    label: "Esportes",
  },
  {
    value: "Devs",
    icon:"",
    label: "Devs",
  },
  {
    value: "Gamers",
    icon:"",
    label: "Gamers",
  },
  {
    value: "Todas as Tags",
    icon:"",
    label: "Todas as Tags",
  },
   {
    title: "Apps",
    icon: <Grid />,
    badge: "2",
    items: [
      { title: "All Apps", url: "#" },
      { title: "Recent", url: "#" },
      { title: "Updates", url: "#", badge: "2" },
      { title: "Installed", url: "#" },
    ],
  },
  {
    title: "Files",
    icon: <FileText />,
    items: [
      { title: "Recent", url: "#" },
      { title: "Shared with me", url: "#", badge: "3" },
      { title: "Favorites", url: "#" },
      { title: "Trash", url: "#" },
    ],
  },
  {
    title: "Projects",
    icon: <Layers />,
    badge: "4",
    items: [
      { title: "Active Projects", url: "#", badge: "4" },
      { title: "Archived", url: "#" },
      { title: "Templates", url: "#" },
    ],
  },
  {
    title: "Learn",
    icon: <BookOpen />,
    items: [
      { title: "Tutorials", url: "#" },
      { title: "Courses", url: "#" },
      { title: "Webinars", url: "#" },
      { title: "Resources", url: "#" },
    ],
  },
  {
    title: "Community",
    icon: <Users />,
    items: [
      { title: "Explore", url: "#" },
      { title: "Following", url: "#" },
      { title: "Challenges", url: "#" },
      { title: "Events", url: "#" },
    ],
  },
  {
    title: "Resources",
    icon: <Bookmark />,
    items: [
      { title: "Stock Photos", url: "#" },
      { title: "Fonts", url: "#" },
      { title: "Icons", url: "#" },
      { title: "Templates", url: "#" },
    ],
  },
]


function Home({ children }) {
  const [search, setSearch] = useState("");
  const [searchAZ, setSearchAZ] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const isMobile = useIsMobile();
  const contactsRef = useRef();
  const smoother = useRef();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({})  
  // Popover
  const [open,setOpen] = React.useState(false)
  const [value,setValue] = React.useState('')
  
  const scrollToEnd = () => {
    if (smoother.current && contactsRef.current) {
      smoother.current.scrollTo(".fim", true, "center center");
    } else {
      console.warn("ScrollSmoother or ref not initialized");
    }
  };
  
  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleExpanded = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

 useGSAP(
    () => {
      if (contactsRef.current) {
        // Seleciona todos os elementos de contato (sections)
        const contactElements = gsap.utils.toArray(contactsRef.current.querySelectorAll(".contact-item"));

        // Cria uma animação de entrada para cada contato
        gsap.fromTo(
          contactElements,
          {
            opacity: 0,
            y: 50, // Deslocamento inicial (vem de baixo)
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2, // Atraso entre cada contato para efeito escalonado
            ease: "power2.out",
          }
        );
      }
    },
    { scope: contactsRef, dependencies: [contacts.length] } // Reexecuta quando a quantidade de contatos muda
  );

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/Contacts", {
          params: { search },
        });
        setContacts(response.data);
        console.log("Dados recebidos da API:", response.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Erro ao buscar os contatos:",
          err.response ? err.response.data : err.message
        );
        setError("Failed to fetch contacts");
        setLoading(false);
      }
    };
    fetchContacts();
  }, [search,searchAZ]);


  return (
    <>
      <GradientBackground className="absolute w-full h-full inset-0 flex items-center justify-center rounded-x1 z-[-1]" />
      <div className="flex h-screen">
        
        {/* SideBar Mobile */}
        {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden"  onClick={() => setMobileOpen(false)}/>
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                 <Wand2 className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Oi</h2>
                <p className="text-xs text-muted-foreground">Oiiiiiiiiii</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
              <X className="h-4 w-4"/> 
            </Button>
          </div>
          <div className="px-3 py2">
            <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Procurar..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>
          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {tags.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => item.items && toggleExpanded(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Sidebar */}
        <div 
        className={cn(
          " fixed inset-y-0 left-0 z-30 hidden transform transition-transform duration-300 ease-in-out md:block w-64 border-r bg-black text-white", sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        >
          <div className="flex h-full flex-col">
            <div className="p-4" >
              <div className="flex items-center gap-3">
                <div className=" flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  <Wand2 className="size-5" />
                </div>
                <div>
                   <HighlightText
                    className="font-bold"
                    text="Dashboard">                   
                    </HighlightText>
                    <p className="text-xs text-muted-foreground">Creative contatos</p>
                </div>
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                <Input type="search" className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" placeholder="Procurar..." 
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                ></Input>
              </div>
            </div>
            <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {tags.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => item.items && toggleExpanded(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronUpDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
          </div>
       {/*   
        <section className=" w-full flex-col items-left ">
            <div className=" bg-black text-white">
              {/* BtnNav 
              <div className="p-3">
                <InputButtonProvider>
                  <InputButton value={search} onChange={(e) => setSearch(e.target.value)}>
                    <InputButtonAction>Clique para procurar</InputButtonAction>
                    <InputButtonSubmit  >
                      <Search />
                    </InputButtonSubmit>
                  </InputButton>
                  <InputButtonInput type="text" placeholder="Algum contato" />
                </InputButtonProvider>
              </div>
              {/* NavMain 
              <nav className="flex w-full flex-col mt-1 space-y-1 p-3 ">
                <NavItem
                  href="#"
                  icon={<LayoutGrid className="h-4 w-4" />}
                  active>
                  Todos os contatos
                </NavItem>
                <NavItem
                  href="#"
                  icon={
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor">
                      <path
                        d="M15 3v18M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  }>
                  Favoritos
                </NavItem>
                <NavItem
                  href="#"
                  icon={
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor">
                      <path
                        d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6m-3 4v6m-3-3h6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }>
                  Todos do businesses
                </NavItem>
                <div className="py-3">
                  <div className="px-3 text-xl font-medium uppercase ">
                    Coleções
                  </div>
                  <NavItem>
                    <div>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-65 align-center justify-between h-full flex border-2 rounded-2xl p-3 "
                        >
                          {value  
                            ? tags.find((tags)=> tags.value === value)?.label
                            : 'Tags'}
                            <ChevronUpDown animateOnHover animation="default-loop"/>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 ">
                      <Command>
                        <CommandInput placeholder="Selecionar por tags"/>
                        <CommandList>
                          <CommandEmpty>Nem uma tag encontrada</CommandEmpty>
                          <CommandGroup>  
                            {tags.map((tags) => (
                              <CommandItem
                                key={tags.value}
                                value={tags.value}
                                onSelect={(currentValue)=>{
                                  setValue(currentValue === value ? '' : currentValue)
                                  setOpen(false)
                                }}>
                                {tags.label}
                                <Check
                                className={cn("ml-auto",
                                  value === tags.value ? "opacity-100" : "opacity-0")}/>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                      </PopoverContent>
                    </Popover>
                    </div>
                  </NavItem>
                </div>
              </nav>
              {/* Footer nav 
              <footer className="p-3 mt-80  items-center justify-between block   ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      variant="outline"
                      asChild
                      className="w-full h-full flex items-center justify-between border-2 rounded-2xl p-3">
                      <img src="" alt="" />
                      Nome do usuário
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}></motion.button>
                      <Settings />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 ">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User />
                        <span>Perfil</span>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell />
                        <span>Notificações</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings2 />
                        <span>Configurações</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Keyboard />
                        <span>teclado de atalhos</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Users />
                        <span>Team</span>
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <UserPlus />
                          <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <Mail />
                              <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare />
                              <span>Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <PlusCircle />
                              <span>More...</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem disabled>
                        <Plus />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </footer>
            </div>
          </section> */}
        </div>
      
      {/* Main content Contatos */}
       <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0  flex h-20 w-200 ml-1 item-center gap-1 border-2  rounded-2xl p-1 px-1 bg-black/30 backdrop-blur-lg shadow-xl shadow-black/50  ">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h5-w-5"/>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col">
                <div className="flex flex-col flex-1 ">
                  <p className="text-xs font-semibold text-muted-foreground">Total de contatos: {contacts.length}</p>
                  <h1 className="text-x1 font-semibold">Contatos</h1>
                  <div className="flex  flex-row gap-3 ">
                  <button className="flex align-center cursor-pointer  " >Filtrar por <ArrowDown animateOnHover animation="out"/> </button>
                  <button className="cursor-pointer " value={searchAZ} onChange={(e) => setSearchAZ(e.target.value)} >A-Z</button>
                  <button className=" cursor-pointer  " onClick={scrollToEnd}>
                    Ir para o fim
                  </button>
                  </div>
                </div>
              </div>
               
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-2x1">
                            <Bell className="h-5 w-5" />  
                            {Notification > 0 && (
                              <span className="absolute-right-1 -top-1 flex h-5 w-5 item-center justify-center rounded-full bg-red-500 text-white">
                                {Notification}
                              </span>
                            )}
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Notificações
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-2x1">
                            <Bell className="h-5 w-5" />  
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Notificações
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-2x1">
                            <Bell className="h-5 w-5" />  
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Notificações
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Avatar className="h-6 w-6">
                    <AvatarImage src=""></AvatarImage>
                    <AvatarFallback>aASDA</AvatarFallback>
                  </Avatar>
                </div>
            </div>
        </header>
          
       
        <div className="smooth-wrapper-contatos">
          <div className="smooth-content-contatos" ref={contactsRef}>
            <nav className="flex flex-col justify-center items-center">
              <div className="flex pl-4 flex-row justify-between w-full items-center">
           {/*    <Tabs defaultValue="Perfil" className="w-[400px] bg-muted rounded-lg">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Perfil">
                      Perfil
                    </TabsTrigger>
                    <TabsTrigger>
                      Contatos
                    </TabsTrigger>
                  </TabsList>
                  <TabsContents className="mx-1 mb-1 mt-1 rounded-sm h-full bg-background">
                    <TabsContent className="space-y-6 p-6">
                      <p>Hello</p>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor=""></Label>
                          <Input type="text" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor=""></Label>
                          <Input type="text" />
                        </div>
                      </div>
                      <Button></Button>
                    </TabsContent>
                    <TabsContent className="space-y-6 p-6">
                      <p>oi</p>
                      <div>
                        <div>
                          <Label></Label>
                          <Input></Input>
                        </div>
                      </div>
                      <Button>Salvar</Button>
                    </TabsContent>
              </TabsContents>
              </Tabs> */}
              </div>
            </nav>

            {contacts.length > 0 ? (
              <>
                {contacts.map((contact) => (
                  <section
                    className="flex p-4 flex-col contact-item"
                    key={contact._id}>
                      <ScrollArea>
                        <div className="flex flex-row justify-between items-center">
                          <img src={contact.Imagem} alt="" />
                          <h1>{contact.Nome || "Nome não disponível"}</h1>
                          <p>{contact.Telefone || "Telefone não disponível"}</p>
                          <p>{contact.Email || "Email não disponível"}</p>
                          <p>{contact.WhatsApp || "WhatsApp não disponível"}</p>
                        </div>
                      </ScrollArea>
                  </section>
                ))}
                <div className="fim"></div>
              </>
            ) : !loading && !error ? (
              <p>No contacts found</p>
            ) : null}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Home;
